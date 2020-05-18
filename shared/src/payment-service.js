"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const api_config_model_1 = require("./api-config-model");
const order_service_1 = require("./order-service");
const ethereumjs_tx_1 = require("ethereumjs-tx");
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/29e10dfabfb3464f800bccc2f1f885be'));
function PayForOrder(order, walletAddress, privateKey) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const count = yield web3.eth.getTransactionCount(walletAddress);
        const pvtKey = Buffer.from(privateKey, 'hex');
        const txObject = {
            nonce: web3.utils.toHex(count),
            to: api_config_model_1.ApiConfigModel.BankWalletId,
            value: web3.utils.toHex(order.total),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        };
        const tx = new ethereumjs_tx_1.Transaction(txObject, {
            chain: 'ropsten',
            hardfork: 'petersburg',
        });
        tx.sign(pvtKey);
        const serializedTx = tx.serialize();
        const transactionData = '0x' + serializedTx.toString('hex');
        const receipt = yield web3.eth.sendSignedTransaction(transactionData);
        if (receipt instanceof Error) {
            throw receipt;
        }
        const transactionReceipt = receipt;
        const payment = {
            id: transactionReceipt.transactionHash,
            transactionId: transactionReceipt.transactionHash,
            correlationId: transactionReceipt.blockHash,
            referenceNumber: transactionReceipt.blockNumber.toString(),
            referenceId: transactionReceipt.transactionIndex.toString(),
            transactionDate: new Date(),
            accountHolderName: transactionReceipt.to,
            amount: order.total,
            type: 'eth',
            created: new Date()
        };
        const response = yield order_service_1.AddPaymentToOrder(order.id, payment);
        return response;
    });
}
exports.PayForOrder = PayForOrder;
//# sourceMappingURL=payment-service.js.map