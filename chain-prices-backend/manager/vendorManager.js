const { createInventory } = require("../models/inventory");
const { createInventoryItem } = require("../models/inventoryItem");
const { ProductModel } = require("../models/product");
const { TransactionModel } = require("../models/transaction");
const { createVendor, VendorModel } = require("../models/vendor");
const { inventoryItemManager } = require("./inventoryItemManager");
const { inventoryManager } = require("./inventoryManager");
const { userManager } = require("./userManager");

class VendorManager {
  constructor() {}

  async createVendorInventory() {
    const inventory = await createInventory();

    return inventory.id;
  }

  async createVendorByUserId(adminUserId, userId) {
    if (adminUserId === userId) {
      throw new Error("Admin user cannot be vendor!");
    }

    const isVendorExist = await this.isVendorExistByUserId(userId);

    if (isVendorExist) {
      throw new Error("Vendor already exist!");
    }

    const inventoryId = await this.createVendorInventory();

    const vendor = await createVendor(userId, inventoryId);

    const updateUserRoleResult = await userManager.updateUserRoleToVendor(userId);

    if (updateUserRoleResult === null) {
      throw new Error("Something went wrong while updating user role!");
    }

    return vendor.id;
  }

  async findVendorByUserId(userId) {
    const vendorResult = await VendorModel.findOne({ where: { userId } });
    if (vendorResult === null) {
      return null;
    }

    return vendorResult;
  }

  async isVendorExistByUserId(userId) {
    const result = await this.findVendorByUserId(userId);

    return result !== null;
  }

  async getAllVendors() {
    const allVendors = await VendorModel.findAll({ include: "User" });

    return allVendors;
  }

  async checkRequestInventoryItem(vendorIdentifier, vendorUserId, items) {
    const vendor = await this.findVendorByUserId(vendorUserId);
    if (vendor === null) {
      throw new Error("Vendor not found!");
    }

    const vendorInventory = await inventoryManager.getVendorInventory(vendor.inventoryId);

    if (vendorInventory === null) {
      throw new Error("Vendor inventory not found!");
    }

    const inventoryItems = await inventoryItemManager.getAllInventoryItemsByInventoryId(vendorInventory.id);

    let finePrice = 0;

    items.forEach((item) => {
      const isAvailable = this.isAvailableItem(inventoryItems, item);
      if (!isAvailable.result) {
        finePrice += isAvailable.punish;
      }
    });

    const allPunishments = await this.getAllPunishmentByMarketAddress(vendorIdentifier)

    allPunishments.forEach(punishment => {
      finePrice += inventoryManager.calculatePunish(punishment.amountOfProduct, punishment.priceOfProduct)
    });

    return {
      finePrice: finePrice,
      items,
    };
  }

  async finalizeRequestInventoryItem(vendorIdentifier, vendorUserId, items) {
    const vendor = await this.findVendorByUserId(vendorUserId);
    if (vendor === null) {
      throw new Error("Vendor not found!");
    }

    const vendorInventory = await inventoryManager.getVendorInventory(vendor.inventoryId);

    if (vendorInventory === null) {
      throw new Error("Vendor inventory not found!");
    }

    const inventoryItems = await inventoryItemManager.getAllInventoryItemsByInventoryId(vendorInventory.id);

    for (let i = 0; i < items.length; i++) {
      const item = this.getInventoryItem(inventoryItems, items[i]);

      const product = await ProductModel.findOne({where: { id: items[i].productId }});

      if (product === null) {
        throw new Error("Product not found!")
      }

      if (item === false) {
        await createInventoryItem(
          items[i].productId,
          items[i].count,
          product.price,
          vendorInventory.id
        );
      } else {
        item.count += items[i].count;
        item.save();
      }
    }

    await this.paidAllPastPunishment(vendorIdentifier)

    return true;
  }

  async getAllVendorInventoryItems(vendorUserIdentifier) {
    const user = await userManager.findUserByIdentifier(vendorUserIdentifier);

    if (user === null) {
      throw new Error('User not found!')
    }

    const vendor = await this.findVendorByUserId(user.id)

    if (vendor === null) {
      throw new Error('Vendor not found!')
    }

    const inventory = await inventoryManager.getVendorInventory(vendor.inventoryId)

    if (inventory === null) {
      throw new Error('Inventory not found!')
    }

    return await inventoryItemManager.getAllInventoryItemsByInventoryId(inventory.id);
  }

  async getAllPunishmentByMarketAddress(marketAddress) {
    return await TransactionModel.findAll({where: {marketAddress: marketAddress, isPaid: false, status: "failed"}})
  }

  async paidAllPastPunishment(marketAddress) {
    const allPunishment = await this.getAllPunishmentByMarketAddress(marketAddress);

    for (let i = 0; i < allPunishment.length; i++) {
      allPunishment[i].isPaid = true;
      await allPunishment[i].save();
    }
  }

  isAvailableItem(inventoryItems, requestedItem) {
    for (let i = 0; i < inventoryItems.length; i++) {
      if (requestedItem.productId === inventoryItems[i].Product.id) {
        const isAvailableToRequest = inventoryManager.isInventoryItemAvailableToRequest(inventoryItems[i]);

        if (isAvailableToRequest) {
          return { result: true, punish: 0 };
        } else {
          return { result: false, punish: inventoryManager.calculatePunish(requestedItem.count, inventoryItems[i].Product.price)};
        }
      }
    }

    return { result: true, punish: 0 };
  }

  getInventoryItem(inventoryItems, item) {
    for (let i = 0; i < inventoryItems.length; i++) {
      if (inventoryItems[i].Product.id === item.productId) {
        return inventoryItems[i]
      }
    }

    return false;
  }
}

const vendorManager = new VendorManager();
module.exports = { vendorManager };
