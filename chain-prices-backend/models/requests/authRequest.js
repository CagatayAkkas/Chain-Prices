class AuthRequest {
    constructor(requestBody) {
        this.identifier = requestBody.identifier
    }

    getIdentifier() {
        return this.identifier;
    }
}

module.exports = AuthRequest;