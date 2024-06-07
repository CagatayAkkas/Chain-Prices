const { Model, DataTypes } = require("sequelize");

class User extends Model {}

const createUser = async identifier => {
  const userResult = await User.create(
    {
      identifier: identifier,
      role: 'user',
    }
  )

  return userResult;
}

module.exports = {
  createUser,
  UserModel: User,
  callback: (client) => {
    return User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        identifier: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      },
      {
        sequelize: client,
        modelName: "User",
        timestamps: true,
        createdAt: true,
        updatedAt: "updateTimestamp",
      }
    );
  },
};
