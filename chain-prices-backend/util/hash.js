const { createHash } = require('crypto');

const createObjectHash = (data) => {
    return createHash('sha256').update(data).digest('hex');
}

module.exports = {
    createHash: createObjectHash,
};