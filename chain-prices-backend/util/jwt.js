var jwt = require('jsonwebtoken');

class JWTManager {
    constructor() {
        this.data = {}
    }

    prepareTokenData(identifier, role, userId) {
        this.data = {identifier, role, userId}
        return this;
    }

    generateToken() {
        this.token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                data: JSON.stringify(this.data)
            }, process.env.JWT_PRIVATE_KEY)

        return this;
    }

    getToken() {
        return this.token;
    }

    verifyToken(token) {
        const data = jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
            if (err) {
                return null
            }

            return decoded
        })

        return data;
    }
}

module.exports = JWTManager