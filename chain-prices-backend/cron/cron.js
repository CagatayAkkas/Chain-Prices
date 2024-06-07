const cron = require('node-cron')
const fs = require('fs')
const { ProductModel, createProduct } = require('../models/product');
const { transactionManager } = require('../manager/transactionManager');
const { IngredientModel, createIngredient } = require('../models/ingredient');

const getTransactionsTask = cron.schedule('*/10 * * * * *', () => {
    transactionManager.fetchTransactions().then((result) => {
        result.forEach( async transaction => {
            const findTransaction = await transactionManager.getTransaction(transaction);
            if (findTransaction === null) {
                const createResult = await transactionManager.createTransactionAndPunishIfNeeded(transaction)
                console.log(`Transaction successfully created with id: ${createResult.id}`)
            }
        })

        console.log('All transactions were synchronized successfully!');
    }).catch((err) => {
        console.log(err)
    });
});

const syncProductDatabase = cron.schedule('*/10 * * * * *', () => {
    fs.readFile('config/products.json', 'utf-8', (error, data) => {
        if (error) {
            console.log(error)
        }

        const allProducts = JSON.parse(data).products;
        allProducts.forEach(async (product) => {
            const productResult = await ProductModel.findOne({ where: {name: product.name, productCode: product.productCode}})
            if (productResult === null) {
                const createResult = await createProduct(product);
                console.log(`Product successfully created with id: ${createResult.id}`)
            } else {
                productResult.maxPrice = product.maxPrice
                productResult.price = product.price
                productResult.barcode = product.barcode
                productResult.netWeight_g = product.netWeight_g
                productResult.netWeight_ml = product.netWeight_ml
                productResult.fat_g = product.fat_g
                productResult.kcal = product.kcal
                productResult.carbohydrate_g = product.carbohydrate_g
                productResult.sugar_g = product.sugar_g
                productResult.fiber_g = product.fiber_g
                productResult.protein_g = product.protein_g
                productResult.salt_g = product.salt_g
                productResult.ingredients = product.ingredients
                productResult.image_url = product.image_url
                productResult.save()
            }
        })

        console.log('All products were synchronized successfully!');
    })
})

const syncIngredients = cron.schedule('*/10 * * * * *', () => {
    fs.readFile('config/ingredients.json', 'utf-8', (error, data) =>{
        if (error) {
            console.log(error)
        }

        const allIngredients = JSON.parse(data).ingredients;
        allIngredients.forEach(async (ingredient) => {
            const ingredientResult = await IngredientModel.findOne({ where: {name: ingredient.name, ingredientId: ingredient.ingredientId}})
            if (ingredientResult === null) {
                const createResult = await createIngredient(ingredient);
                console.log(`Ingredient successfully created with id: ${createResult.id}`)
            } else {
                ingredientResult.origin = ingredient.origin
                ingredientResult.certificate = ingredient.certificate
                ingredientResult.save();
            }
        })
    })
})

module.exports = { getTransactionsTask, syncProductDatabase, syncIngredients }