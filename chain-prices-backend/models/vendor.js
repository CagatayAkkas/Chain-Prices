const { Model, DataTypes } = require("sequelize");
const { UserModel } = require("./user");
const { InventoryModel } = require("./inventory");

class Vendor extends Model {}

const createVendor = async (userId, inventoryId) => {
    return await Vendor.create(
        {
            userId,
            inventoryId,
        }
    )
}

module.exports = {
    createVendor,
    VendorModel: Vendor,
    callback: (client) => {
        Vendor.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                }
            },
            {
                sequelize: client,
                modelName: "Vendor",
                timestamps: true,
                createdAt: true,
                updatedAt: "updateTimestamp",
            }
        )

        Vendor.User = Vendor.belongsTo(UserModel, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            }
        });
        Vendor.Inventory = Vendor.belongsTo(InventoryModel, {
            foreignKey: {
                name: "inventoryId",
                allowNull: false,
            }
        });

        return;
    }
}