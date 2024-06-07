const { Op } = require("sequelize");
const { IngredientModel } = require("../models/ingredient");
const { ProductModel } = require("../models/product");

class ProductManager {
    constructor(){}

    async getProductByBarcode(barcode) {
        const productResult = await ProductModel.findOne({ where: { barcode: barcode }})
        if (productResult === null) {
            return null
        }

        const ingredients = await this.getProductIngredients(productResult.ingredients)
        productResult.ingredients = ingredients

        return productResult;
    }

    async getAllProduct() {
        const allProductResult = await ProductModel.findAll()

        return allProductResult
    }

    async getProductByProductCode(code) {
        const productResult = await ProductModel.findOne({ where: {productCode: code}})
        if (productResult === null) {
            return null
        }

        const ingredients = await this.getProductIngredients(productResult.ingredients)
        productResult.ingredients = ingredients

        return productResult
    }

    async getProductIngredients(ingredients) {
        let ingredientsArray = ingredients.split(',');
        ingredientsArray = ingredientsArray.map((ingredientId) => parseInt(ingredientId));

        const result = await IngredientModel.findAll({where: {ingredientId: {[Op.in]: ingredientsArray}}})

        return result
    }
}

const productManager = new ProductManager();
module.exports = { productManager }