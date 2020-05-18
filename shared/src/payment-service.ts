import { ResourceModel } from './resource-model';
import { ApiConfigModel } from './api-config-model';
import { PaymentModel } from './payment-model';
import { AddPaymentToOrder } from './order-service';
import { Transaction } from 'ethereumjs-tx';

// import * as Web3 from 'web3';
const Web3 = require("web3");
// import { Eth } from 'web3-eth';
import { TransactionReceipt } from 'web3-core';
import { OrderModel } from './order-model';

// let web3: Web3

const web3 = new Web3(
  new Web3.providers.HttpProvider(ApiConfigModel.Web3InfuraEndpoint),
  // new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/29e10dfabfb3464f800bccc2f1f885be')
);

export async function PayForOrder(
  // orderId: string,
  // orderTotal: number,
  order: OrderModel,
  walletAddress: string,
  privateKey: string,
): Promise<ResourceModel<OrderModel>> {
  const count = await web3.eth.getTransactionCount(walletAddress);
  const pvtKey = Buffer.from(privateKey, 'hex');

  // Build the transaction
  const txObject = {
    nonce: web3.utils.toHex(count),
    to: ApiConfigModel.BankWalletId,
    value: web3.utils.toHex(order.total), // this value is in wei
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
  };

  // Sign the transaction
  const tx = new Transaction(txObject, {
    chain: 'ropsten',
    hardfork: 'petersburg',
  });

  tx.sign(pvtKey);

  const serializedTx = tx.serialize();
  const transactionData = '0x' + serializedTx.toString('hex');
  const receipt = await web3.eth.sendSignedTransaction(transactionData);

  console.log(receipt);

  if (receipt instanceof Error) {
    throw receipt;
  }

  const transactionReceipt = receipt as TransactionReceipt;

  const payment: PaymentModel = {
    id: transactionReceipt.transactionHash,
    transactionId: transactionReceipt.transactionHash,
    correlationId: transactionReceipt.blockHash,
    // referenceNumber: transactionReceipt.blockNumber.toString(),
    referenceId: transactionReceipt.transactionIndex.toString(),
    transactionDate: new Date(),
    accountHolderName: transactionReceipt.to,
    amount: order.total,
    type: 'eth',
    created: new Date()
  };

  console.log("before adding payment");
  const response = await AddPaymentToOrder(order.id, payment);
  console.log("after adding payment");

  return response;
}
