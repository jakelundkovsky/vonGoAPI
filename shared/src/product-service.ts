import { ResourceModel } from './resource-model';
import { ProductModel } from './product-model';
import { ApiConfigModel } from './api-config-model';

import axios from 'axios';

const productsUrl = `${ApiConfigModel.StagingUrl}/issuer/${ApiConfigModel.StagingIssuerId}/products`;

export async function GetProducts(): Promise<ResourceModel<ProductModel[]>> {
  const response = await axios.get<ResourceModel<ProductModel[]>>(productsUrl);

  return response.data;
}

export async function GetProduct(
  id: string,
): Promise<ResourceModel<ProductModel>> {
  const productUrl = `${productsUrl}/${id}`;

  const response = await axios.get<ResourceModel<ProductModel>>(productUrl);

  return response.data;
}
