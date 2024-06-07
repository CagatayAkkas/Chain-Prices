const { Model, DataTypes } = require("sequelize");

class Transaction extends Model {}

const createTransaction = async transactionData => {
  const transactionResult = await Transaction.create(
    {
      contractAddress: transactionData.contractAddress,
      topics: transactionData.topics.toString(),
      data: transactionData.data,
      blockNumber: transactionData.blockNumber,
      blockHash: transactionData.blockHash,
      transactionTimeStamp: transactionData.timeStamp,
      gasPrice: transactionData.gasPrice.toString(),
      gasUsed: transactionData.gasUsed,
      logIndex: transactionData.logIndex,
      transactionHash: transactionData.transactionHash,
      amountOfProduct: transactionData.amountOfProduct,
      priceOfProduct: transactionData.priceOfProduct,
      productCode: transactionData.productCode,
      transactionIndex: transactionData.transactionIndex,
      marketAddress: transactionData.marketAddress,
      transactionHashLabel: transactionData.transactionHashLabel,
      status: transactionData.status,
      isPaid: transactionData.status === "success" ? true : false,
    }
  )

  return transactionResult;
}

module.exports = {
  createTransaction,
  TransactionModel: Transaction,
  callback: (client) => {
    return Transaction.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        contractAddress: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        topics: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        data: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        blockNumber: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        blockHash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        transactionTimeStamp: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        gasPrice: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        gasUsed: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        logIndex: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        transactionHash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        amountOfProduct: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        priceOfProduct: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        productCode: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        transactionIndex: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        marketAddress: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        transactionHashLabel: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isPaid: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        }
      },
      {
        sequelize: client,
        modelName: "Transaction",
        timestamps: true,
        createdAt: true,
        updatedAt: "updateTimestamp",
      }
    );
  },
};
