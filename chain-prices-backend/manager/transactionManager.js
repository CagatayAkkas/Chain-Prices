const transactionAPI = require("../api/transaction");
const {
  TransactionModel,
  createTransaction,
} = require("../models/transaction");
const { ProductModel } = require("../models/product");
const { blockchainManager } = require("./blockchainManager");
const { inventoryItemManager } = require("./inventoryItemManager");
const { vendorManager } = require("./vendorManager");
const { userManager } = require("./userManager");
const { inventoryManager } = require("./inventoryManager");

class TransactionManager {
  constructor() {}

  async punishIfNeeded(transaction) {
    const checkProductPriceResult = await this.checkProductPriceBelowLimit(
      transaction
    );

    if (!checkProductPriceResult) {
      transaction.status = 'failed';
      return transaction;
    } else {
      transaction.status = 'success';
      return transaction;
    }
  }

  async checkProductPriceBelowLimit(transaction) {
    const findProduct = await ProductModel.findOne({
      where: { productCode: transaction.productCode },
    });

    if (findProduct === null) {
      return true;
    }

    return transaction.priceOfProduct <= findProduct.maxPrice;
  }

  async fetchTransactions() {
    return await transactionAPI.getTransactionLogsFromSepolia();
  }

  async getTransaction(transaction) {
    return await TransactionModel.findOne({
      where: { transactionHashLabel: transaction.transactionHashLabel },
    });
  }

  async createTransactionAndPunishIfNeeded(transaction) {
    transaction = await this.punishIfNeeded(transaction);

    try {
      const user = await userManager.findUserByIdentifier(transaction.marketAddress);
      const vendor = await vendorManager.findVendorByUserId(user.id);
      
      await inventoryItemManager.reduceInventoryItemCountByInventoryIdAndProductCode(vendor.inventoryId, transaction.productCode, transaction.amountOfProduct);
    } catch(err) {
      console.log("Getting error while updating vendor inventory!")
    }

    return await createTransaction(transaction);
  }

  calculatePenaltyFee(transaction, product) {
    return (
      (transaction.priceOfProduct - product.maxPrice) *
      2 *
      transaction.amountOfProduct
    );
  }

  async getAllTransactionList() {
    const response = [];

    const result = await TransactionModel.findAll();

    result.forEach((transaction) => {
      let topics = transaction.topics.split(",");
      topics = topics.map((topic) => BigInt(topic).toString());

      response.push({
        transactionId: transaction.id,
        status: transaction.status,
        timestamp: transaction.transactionTimeStamp,
        marketAddress: transaction.marketAddress,
        transactionHash: transaction.transactionHash,
        etherscan: `https://sepolia.etherscan.io/tx/${transaction.transactionHash}`,
        productCode: transaction.productCode,
      });
    });

    return response;
  }
}

const transactionManager = new TransactionManager();
module.exports = { transactionManager };
