const { InventoryModel } = require("../models/inventory");

class InventoryManager {
  constructor() {
    this.threshold = 10;
  }

  async getVendorInventory(inventoryId) {
    return await InventoryModel.findByPk(inventoryId);
  }

  isProductCountUnderThreshold(inventoryItem) {
    return inventoryItem.count <= this.threshold;
  }

  isProductStocked(inventoryItem) {
    return true;
  }

  isInventoryItemAvailableToRequest(inventoryItem) {
    return (
      this.isProductStocked(inventoryItem) &&
      this.isProductCountUnderThreshold(inventoryItem)
    );
  }

  calculatePunish(count, price) {
    return count * price * 2;
  }
}

const inventoryManager = new InventoryManager();
module.exports = { inventoryManager };
