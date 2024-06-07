const { Model, DataTypes } = require("sequelize");
const { ProductModel } = require("./product");

class InventoryItem extends Model {}

const createInventoryItem = async (productId, count, price, inventoryId) => {
  return await InventoryItem.create({
    price,
    count,
    ProductId: productId,
    InventoryId: inventoryId,
  });
};

module.exports = {
  createInventoryItem,
  InventoryItemModel: InventoryItem,
  callback: (client) => {
    InventoryItem.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        count: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize: client,
        modelName: "InventoryItem",
        timestamps: true,
        createdAt: true,
        updatedAt: "updateTimestamp",
      }
    );

    InventoryItem.Product = InventoryItem.belongsTo(ProductModel);

    return;
  },
};
