export interface PaymentModel {
  currencyCode?: string;
  amount?: number;
  tax?: number;
  balance?: number;
  transactionId?: string;
  responseCode?: string;
  responseDescription?: string;
  status?: string;
  transactionDate?: Date;
  type?: string;
  accountHolderName?: string;
  customerId?: string; // customer's wallet address
  customerToken?: string; // customer's wallet private key
  created?: Date;
  modified?: Date;
  orderId?: string;
  issuerId?: string;
  couponId?: string;
  // referenceNumber?: string;
  referenceId?: string;
  userId?: string;
  isRevision?: boolean;
  revisionId?: string;
  batchId?: string;
  correlationId?: string;
  id?: string;
}
