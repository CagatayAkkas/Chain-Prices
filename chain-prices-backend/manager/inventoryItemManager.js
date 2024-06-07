const { Op } = require("sequelize");
const { InventoryItemModel } = require("../models/inventoryItem");
const { ProductModel } = require("../models/product");
const { inventoryManager } = require("./inventoryManager");

class InventoryItemManager {
    constructor() {}

    async getAllInventoryItemsByInventoryId(inventoryId) {
        return await InventoryItemModel.findAll({where: {InventoryId: inventoryId, count: {[Op.gt]: 0}}, include: 'Product'})
    }

    async reduceInventoryItemCountByInventoryIdAndProductCode(inventoryId, productCode, count) {
        let inventory = await inventoryManager.getVendorInventory(inventoryId);
        
        if (inventory === null) {
            throw new Error("Inventory not found!")
        }

        let inventoryItem = await this.getInventoryItemByInventoryIdAndProductCode(inventoryId, productCode);

        if (inventoryItem === null) {
            throw new Error("Product not found!")
        }

        if (inventoryItem.count < count) {
            throw new Error("Insufficient product!")
        }

        inventoryItem.count -= count
        await inventoryItem.save();
    }

    async getInventoryItemByInventoryIdAndProductCode(inventoryId, productCode) {
        const product = await ProductModel.findOne({where: { productCode }})
        if (product === null) {
            throw new Error('Product not found!')
        }

        return await InventoryItemModel.findOne({where: {InventoryId: inventoryId, ProductId: product.id}})
    }
}

const inventoryItemManager = new InventoryItemManager();
module.exports = { inventoryItemManager }