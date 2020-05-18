import { ProductModel } from './product-model';
import { PaymentModel } from './payment-model';

export interface OrderModel {
  type?: string;
  paymentStatus?: string;
  status?: string;
  hasProducts?: boolean;
  hasPriceModifiers?: boolean;
  tableNumber?: string;
  partySize?: number;
  priceModifiers?: string[];
  products?: ProductModel[];
  payments?: PaymentModel[];
  totalAmountPaid?: number;
  subtotal?: number;
  tax?: number;
  gratuity?: number;
  discount?: number;
  shippingAndHandling?: number;
  total?: number;
  created?: Date;
  modified?: Date;
  links?: string[];
  issuerId?: string;
  id?: string;
}
