const { createHash } = require('../util/hash');

class TransactionAPI {
    constructor(){
        this.apiUrl = process.env.SEPOLIA_API_URL;
    }

    async getTransactionLogsFromSepolia() {
        let transactions = [];

        const response = await fetch(this.apiUrl);
        const data = await response.json();

        if (data.status === "1") {
            const logs = data.result;

            logs.forEach(log => {
                const topics = log.topics.map((topic) => BigInt(topic).toString());
                if (log.topics[0] === process.env.SUCCESS_TRANSACTION) {
                    const transaction = {
                        topics: topics,
                        data: log.data,
                        blockNumber: parseInt(log.blockNumber, 16),
                        blockHash: log.blockHash,
                        timeStamp: parseInt(log.timeStamp, 16),
                        gasPrice: parseInt(log.gasPrice, 16),
                        gasUsed: parseInt(log.gasUsed, 16),
                        logIndex: parseInt(log.logIndex, 16),
                        transactionHash: log.transactionHash,
                        transactionIndex: parseInt(log.transactionIndex, 16),
                        contractAddress: log.address.toLowerCase(),
                        amountOfProduct: Number(topics[1]),
                        priceOfProduct: Number(topics[2]),
                        productCode: Number(topics[3].slice(-40)),
                        marketAddress: "0x" + log.data.slice(26, 66),
                    }

                    const transactionHash = createHash(JSON.stringify(transaction));

                    transactions.push(
                        {
                            ...transaction,
                            transactionHashLabel: transactionHash,
                        },
                    )
                }
            });
        }

        return transactions;
    }
}

const transactionAPI = new TransactionAPI();
module.exports = transactionAPI;