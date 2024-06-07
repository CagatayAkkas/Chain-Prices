const { Model, DataTypes } = require("sequelize");

class Product extends Model {}

const createProduct = async product => {
    const createResult = await Product.create({...product})

    return createResult;
}

module.exports = {
    createProduct: createProduct,
    ProductModel: Product,
    callback: (client) => {
        Product.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                productCode: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    unique: true,
                },
                maxPrice: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                },
                price: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                },
                barcode: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    unique: true,
                },
                netWeight_g: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                netWeight_ml: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                fat_g: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                kcal: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                carbohydrate_g: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                sugar_g: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                fiber_g: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                protein_g: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                salt_g: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                ingredients: {
                    type: DataTypes.STRING(10_000),
                    allowNull: true,
                },
                image_url: {
                    type: DataTypes.STRING,
                    allowNull: true,
                }
            },
            {
                sequelize: client,
                modelName: "Product",
                timestamps: true,
                createdAt: true,
                updatedAt: "updateTimestamp",
            }
        )

        return;
    }
}