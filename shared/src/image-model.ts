import { ProductModel } from './product-model';

export interface ImageModel {
  // order?: number,
  // isVariant?: boolean,
  title?: string;
  description?: string;
  images?: string[];
  // price?: number,
  // cost?: number,
  // marketCost?: number,
  // isTaxed?: boolean,
  // isPerishable?: boolean,
  // isTrackedInventory?: boolean,
  // isDiscountable?: boolean,
  // isPurchasableWhenSoldOut?: boolean,
  // isPhysicalProduct?: boolean,
  // isActive?: boolean,
  // measurementType?: number,
  products?: ProductModel[];
  // comments?: string[],
  // productTypes?: string[],
  // kitchenGroups?: string[],
  // saleChannelIds?: string[],
  // collectionIds?: [],
  // bundleIds?: string[],
  // hasRequiredBundle?: boolean,
  // variantOptions?: string[],
  // comboProductIds?: string[],
  // comboCollectionIds?: string[],
  // isComboWithSelectedProducts?: boolean,
  // isComboWithIncludedProducts?: boolean,
  // orderIncludedProducts?: string[],
  // isDonenessEnabled?: boolean,
  // isSpiceLevelEnabled?: boolean,
  // orderSeats?: string[],
  // created?: Date,
  // modified?: Date,
  // issuerId?: string,
  id?: string;
}
