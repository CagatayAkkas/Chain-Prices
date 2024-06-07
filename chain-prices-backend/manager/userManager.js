const { UserModel, createUser } = require('../models/user');
const JWTManager = require('../util/jwt');

class UserManager {
    constructor() {}

    async findUserByIdentifier(identifier) {
        const user = await UserModel.findOne({where: {identifier: identifier.toLowerCase()}})
        if (user === null) {
            throw new Error('UserNotFound')
        }

        return user;
    }

    async createUser(identifier) {
        return await createUser(identifier);
    }

    async updateUserRoleToVendor(userId) {
        const user = await UserModel.findByPk(userId);
        if (user === null) {
            return null
        }

        user.role = 'vendor'
        user.save();

        return true
    }

    verifyUserToken(token) {
        const result = new JWTManager().verifyToken(token)

        return
    }

    generateUserToken(identifier, role, userId) {
        return new JWTManager().prepareTokenData(identifier, role, userId).generateToken().getToken()
    }
}

const userManager = new UserManager();
module.exports = { userManager };