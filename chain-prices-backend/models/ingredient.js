const { Model, DataTypes } = require("sequelize");

class Ingredient extends Model{}

const createIngredient = async (ing) => {
    const createResult = await Ingredient.create(
        {
            name: ing.name,
            ingredientId: ing.ingredientId,
            origin: ing.origin,
            certificate: ing.certificate,
        }
    )

    return createResult;
}

module.exports = {
    createIngredient,
    IngredientModel: Ingredient,
    callback: (client) => {
        Ingredient.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                ingredientId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                origin: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                certificate: {
                    type: DataTypes.STRING,
                    allowNull: false,
                }
            },
            {
                sequelize: client,
                modelName: "Ingredient",
                timestamps: true,
                createdAt: true,
                updatedAt: "updateTimestamp",
            }
        )
    }
}