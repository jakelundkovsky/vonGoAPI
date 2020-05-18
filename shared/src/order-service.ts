import { ResourceModel } from './resource-model';
import { OrderModel } from './order-model';
import { ApiConfigModel } from './api-config-model';
import { ProductModel } from './product-model';

import axios from 'axios';
import { PaymentModel } from './payment-model';

const ordersUrl = `${ApiConfigModel.StagingUrl}/issuer/${ApiConfigModel.StagingIssuerId}/orders`;

export async function GetOrders(): Promise<ResourceModel<OrderModel[]>> {
  const response = await axios.get<ResourceModel<OrderModel[]>>(ordersUrl);

  return response.data;
}

export async function GetOrder(id: string): Promise<ResourceModel<OrderModel>> {
  const orderUrl = `${ordersUrl}/${id}`;

  const response = await axios.get<ResourceModel<OrderModel>>(orderUrl);

  return response.data;
}

export async function AddProductToOrder(
  id: string,
  product: ProductModel,
): Promise<ResourceModel<OrderModel>> {
  const orderUrl = `${ordersUrl}/${id}/add-products`;

  const data = [
    {
      productId: product.id,
      quantity: 1,
    },
  ];

  const response = await axios.post<ResourceModel<OrderModel>>(orderUrl, data);

  return response.data;
}

export async function AddProductsToOrder(
  id: string,
  products: ProductModel[],
): Promise<ResourceModel<OrderModel>> {
  const orderUrl = `${ordersUrl}/${id}/add-products`;
  const data: any = [];

  products.forEach(element =>
    data.push({ productId: element.id, quantity: 1 }),
  );

  const response = await axios.post<ResourceModel<OrderModel>>(orderUrl, data);

  return response.data;
}

export async function CreateEmptyOrder(): Promise<ResourceModel<OrderModel>> {
  const orderUrl = `${ordersUrl}`;
  const data: any = {};

  const response = await axios.post<ResourceModel<OrderModel>>(orderUrl, data);

  return response.data;
}

export async function RemoveProductsFromOrder(
  id: string,
  products: ProductModel[],
): Promise<ResourceModel<OrderModel>> {
  const orderUrl = `${ordersUrl}/${id}/remove-products`;
  const data: any = [];

  products.forEach(element =>
    data.push({ productId: element.id, quantity: 1 }),
  );

  const response = await axios.post<ResourceModel<OrderModel>>(orderUrl, data);
  return response.data;
}

export async function RemoveProductFromOrder(
  id: string,
  product: ProductModel,
): Promise<ResourceModel<OrderModel>> {
  const orderUrl = `${ordersUrl}/${id}/remove-products`;

  const data: any = [
    {
      productId: product.id,
      quantity: 1,
    },
  ];

  const response = await axios.post<ResourceModel<OrderModel>>(orderUrl, data);
  return response.data;
}

export async function AddPaymentToOrder(
  id: string,
  payment: PaymentModel,
): Promise<ResourceModel<OrderModel>> {
  const orderUrl = `${ordersUrl}/${id}/payments`;

  console.log("Posting to: " + orderUrl);

  const response = await axios.post<ResourceModel<OrderModel>>(
    orderUrl,
    [payment],
  );

  console.log(response);

  return response.data;
}
