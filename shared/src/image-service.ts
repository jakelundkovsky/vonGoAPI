import { ResourceModel } from './resource-model';
import { ProductModel } from './product-model';
import { ApiConfigModel } from './api-config-model';

import { GetProduct } from './product-service';
import { GetProducts } from './product-service';

import fs from 'fs';
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { ApiKeyCredentials, HttpRequestBody } from '@azure/ms-rest-js';

export function GetComputerVisionClient(): ComputerVisionClient {
  const credentials = new ApiKeyCredentials({
    inHeader: {
      'Ocp-Apim-Subscription-Key':
        ApiConfigModel.ProductionAzureComputerVisionKey,
    },
  });

  const computerVisionClient = new ComputerVisionClient(
    credentials,
    ApiConfigModel.ProductionAzureComputerVisionEndpoint,
  );

  return computerVisionClient;
}

export async function GetBestItemMatches(products: ResourceModel<ProductModel[]>, result): Promise<ResourceModel<ProductModel[]>> {
  try {
    // populate set to compare against
    const keywords = {};

    // get tags
    // tslint:disable-next-line: forin
    for (const tag in result.tags) {
      const guessedItem = result.tags[tag].name;
      const guessedTerms = guessedItem.split(' ');

      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < guessedTerms.length; index++) {
        const lowercaseGuessedTerm = guessedTerms[index].toLowerCase();

        if (
          Object.prototype.hasOwnProperty.call(keywords, lowercaseGuessedTerm)
        ) {
          keywords[lowercaseGuessedTerm] = keywords[lowercaseGuessedTerm] + 1;
        } else {
          keywords[lowercaseGuessedTerm] = 1;
        }
      }
    }

    // get description
    // tslint:disable-next-line: forin
    for (const tag in result.description.tags) {
      const guessedItem = result.description.tags[tag].toLowerCase();
      if (Object.prototype.hasOwnProperty.call(keywords, guessedItem)) {
        keywords[guessedItem] = keywords[guessedItem] + 1;
      } else {
        keywords[guessedItem] = 1;
      }
    }

    // get brands
    // tslint:disable-next-line: forin
    for (const brand in result.brands) {
      const guessedBrand = result.brands[brand].name.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(keywords, guessedBrand)) {
        keywords[guessedBrand] = keywords[guessedBrand] + 1;
      } else {
        keywords[guessedBrand] = 1;
      }
    }

    let bestMatch = 0;
    let bestId = '';
    const guesses: ProductModel[] = [];

    // tslint:disable-next-line: forin
    for (const i in products.resource) {
      const product = products.resource[i];
      let currMatch = 0;

      if (product.title != null && product.title !== '') {
        const titleWords = product.title.split(' ');

        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < titleWords.length; index++) {
          const word = titleWords[index].toLowerCase();

          if (Object.prototype.hasOwnProperty.call(keywords, word)) {
            currMatch = currMatch + keywords[word];
          }
        }
      }

      if (product.description != null && product.description !== '') {
        const descriptionWords = product.description.split(' ');

        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < descriptionWords.length; index++) {
          const word = descriptionWords[index].toLowerCase();

          if (Object.prototype.hasOwnProperty.call(keywords, word)) {
            currMatch = currMatch + keywords[word];
          }
        }
      }

      if (currMatch > bestMatch) {
        bestMatch = currMatch;
        bestId = product.id;

        const bestGuess = await GetProduct(bestId);

        if (!bestGuess) {
          throw new Error('Item not found!');
        }

        guesses.push(bestGuess);
      }
    }

    if (bestId === '') {
      throw new Error('Item not found!');
    }
    let final: ResourceModel<ProductModel[]> = {
      id: "",
      resource: [],
      correlationId: "",
      created: new Date(),
      href: "",
      length: 0,
      message: "",
      isSuccess: false
    };
    // final.resource = [];
    for (let i = 0; i < guesses.length; i++) {
      final.resource.push(guesses[i]);
      final.length = final.length + 1;
      final.isSuccess = true;
    }
    return final;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }


}

export async function MatchItemUrl(
  imageUrl: string,
): Promise<ResourceModel<ProductModel[]>> {
  try {
    const products = await GetProducts();
    const computerVisionClient = GetComputerVisionClient();

    const result = await computerVisionClient.analyzeImage(imageUrl, {
      visualFeatures: ['Brands', 'Description', 'Tags'],
    });

    let matches = await GetBestItemMatches(products, result);
    return matches;

  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function MatchItemUpload(
  requestBody: HttpRequestBody,
): Promise<ResourceModel<ProductModel[]>> {
  try {
    const products = await GetProducts();
    const computerVisionClient = GetComputerVisionClient();

    const result = await computerVisionClient.analyzeImageInStream(
      requestBody,
      { visualFeatures: ['Brands', 'Description', 'Tags'] },
    );

    let matches = await GetBestItemMatches(products, result);
    return matches;

  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
