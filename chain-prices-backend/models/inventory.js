const { Model, DataTypes } = require("sequelize");
const { InventoryItemModel } = require("./inventoryItem");

class Inventory extends Model {}

const createInventory = async () => {
    return await Inventory.create()
}

module.exports = {
    createInventory,
    InventoryModel: Inventory,
    callback: (client) => {
        Inventory.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
            },
            {
                sequelize: client,
                modelName: "Inventory",
                timestamps: true,
                createdAt: true,
                updatedAt: "updateTimestamp",
            }
        )

        Inventory.hasMany(InventoryItemModel);
        InventoryItemModel.belongsTo(Inventory);

        return
    }
}