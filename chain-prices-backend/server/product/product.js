const Route = require("../../models/route");
const ServerChainPrices = require("../serverChainPrices");
const { ProductModel } = require("../../models/product");
const BaseResponse = require("../../models/response/baseResponse");
const { productManager } = require("../../manager/productManager");

class Product extends ServerChainPrices {
    getAllProducts() {
        return (req, res) => {
            const query = req.query

            if (query.hasOwnProperty('barcode')) {
                productManager.getProductByBarcode(query['barcode']).then((result) => {
                    if (result === null) {
                        res.status(400).json(new BaseResponse('failed', 'Product not found!', {}).toJson())
                    } else {
                        res.status(200).json(new BaseResponse('success', 'Product result', result).toJson())
                    }
                }).catch((err) => {
                    res.status(400).json(new BaseResponse('failed', 'Something went wrong...', {}).toJson())
                });
            } else {
                productManager.getAllProduct().then((products) => {
                    res.status(200).json(new BaseResponse('success', 'Product result', products).toJson())
                }).catch((err) => {
                    res.status(400).json(new BaseResponse('failed', 'Something went wrong...', {}).toJson())
                });
            }
        }
    }

    getProductByProductCode() {
        return (req, res) => {
            const productCode = parseInt(req.params.code);

            productManager.getProductByProductCode(productCode).then((result) => {
                if (result === null) {
                    res.status(400).json(new BaseResponse('failed', "Product not found!", {}).toJson())
                } else {
                    res.status(200).json(new BaseResponse('success', 'Product result', result).toJson())
                }
            }).catch((err) => {
                res.status(400).json(new BaseResponse('failed', 'Something went wrong...', {}).toJson())
            });
        }
    }
    
    run() {
        return [
            new Route(
                'get',
                '/product',
                this.getAllProducts()
            ),
            new Route(
                'get',
                '/product/:code',
                this.getProductByProductCode()
            ),
        ]
    }
}

const product = new Product();
module.exports = product;