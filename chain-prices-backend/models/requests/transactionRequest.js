class TransactionRequest {
  constructor(requestBody) {
    this.amountOfProduct = requestBody.amountOfProduct;
    this.priceOfTheProduct = requestBody.priceOfTheProduct;
    this.productCode = requestBody.productCode;
    this.marketAddress = requestBody.marketAddress;
  }

  getAmountOfProduct() {
    return this.amountOfProduct;
  }

  getPriceOfTheProduct() {
    return this.priceOfTheProduct;
  }

  getProductCode() {
    return this.productCode;
  }

  getMarketAddress() {
    return this.marketAddress;
  }
}

module.exports = TransactionRequest;
