const ServerChainPrices = require('../serverChainPrices');
const Route = require('../../models/route');
const { userManager } = require('../../manager/userManager');
const AuthRequest = require('../../models/requests/authRequest');
const BaseResponse = require('../../models/response/baseResponse');


class User extends ServerChainPrices {
    auth() {
        return (req, res) => {
            const body = req.body;
            const requestBody = new AuthRequest(body);

            userManager.findUserByIdentifier(requestBody.getIdentifier()).then((result) => {
                const token = userManager.generateUserToken(result.identifier, result.role, result.id)

                res.status(200).json(new BaseResponse('success', 'Login successfully', {token, role: result.role}).toJson())
                return
            }).catch((err) => {
                if (err.message === 'UserNotFound') {
                    const user = userManager.createUser(requestBody.getIdentifier()).then((result) => {
                        const token = userManager.generateUserToken(result.identifier, result.role, result.id)
                        
                        res.status(200).json(new BaseResponse('success', 'Login successfully', {token, role: result.role}).toJson())
                        return
                    }).catch((err) => {
                        res.status(401).json(new BaseResponse('failed', err.message, {}).toJson());
                        return
                    });
                } else {
                    res.status(401).json(new BaseResponse('failed', err.message, {}).toJson());
                    return
                }
            });
        }
    }

    run() {
        return [
            new Route(
                'post',
                '/auth',
                this.auth()
            ),
        ]
    }
}

const user = new User();
module.exports = user;