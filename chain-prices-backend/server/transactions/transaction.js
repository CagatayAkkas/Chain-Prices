const ServerChainPrices = require("../serverChainPrices");
const Route = require("../../models/route");
const { TransactionModel } = require("../../models/transaction");
const TransactionRequest = require("../../models/requests/transactionRequest");
const BaseResponse = require("../../models/response/baseResponse");
const { blockchainManager } = require("../../manager/blockchainManager");
const { transactionManager } = require("../../manager/transactionManager");

class Transaction extends ServerChainPrices {
  getAllTransaction() {
    return (req, res) => {
      transactionManager.getAllTransactionList().then((result) => {
        res.status(200).json(new BaseResponse('success', 'Transaction list', result).toJson());
      }).catch((err) => {
        res.status(400).json(new BaseResponse('failed', err.message, {}).toJson());
      });
    };
  }

  getTransactionById() {
    return (req, res) => {
      const transactionId = parseInt(req.params.id);

      TransactionModel.findByPk(transactionId).then((transaction) => {
        res.status(200).json(new BaseResponse('success', 'Transaction list', transaction).toJson());
      }).catch((err) => {
        res.status(400).json(new BaseResponse('failed', err.message, {}).toJson());
      });
    }
  }

  createTransaction() {
    return (req, res) => {
      const body = req.body;
      const transactionBody = new TransactionRequest(body);

      blockchainManager.transaction(
        Number(transactionBody.getAmountOfProduct()),
        Number(transactionBody.getPriceOfTheProduct()),
        Number(transactionBody.getProductCode()),
        transactionBody.getMarketAddress()
      ).then((result) => {
        if (result.hash) {
          res.status(200).json(new BaseResponse('success', "Transaction successfully created!", {}).toJson())
        } else {
          res.status(400).json(new BaseResponse('failed', "Something went wrong while creating transaction!", {}).toJson())
        }
      }).catch((err) => {
        res.status(400).json(new BaseResponse('failed', err.message, {}).toJson())
      });
    };
  }

  run() {
    return [
      new Route(
        "get", 
        "/transaction", 
        this.getAllTransaction()
      ),
      new Route(
        "post",
        "/transaction",
        this.createTransaction()
      ),
      new Route(
        "get",
        "/transaction/:id",
        this.getTransactionById()
      ),
    ];
  }
}

const transaction = new Transaction();
module.exports = transaction;
