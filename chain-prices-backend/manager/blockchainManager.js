const { ethers, JsonRpcProvider } = require("ethers");
const contractAbi = require("../config/contractAbi.js");

class BlockChainManager {
    constructor(){
        this.contractAddress = process.env.CONTRACT_ADDRESS;
        this.wallet = new ethers.Wallet(
            process.env.PRIVATE_KEY,
            new JsonRpcProvider(process.env.PROVIDER),
        );
        
        this.#createMyContract();
    }

    #createMyContract() {
        this.myContract = new ethers.Contract(
            this.contractAddress,
            contractAbi,
            this.wallet
        );
    }

    async transaction(
        amountOfProduct,
        priceOfProduct,
        productCode,
        marketAddress
    ) {
        return await this.myContract.transaction(
            amountOfProduct,
            priceOfProduct,
            productCode,
            marketAddress
        );
    }

    async punish(
        penaltyFee,
        guiltyAddress
    ) {
        return await this.myContract.punish(
            penaltyFee,
            guiltyAddress
        )
    }
}

const blockchainManager = new BlockChainManager();
module.exports = { blockchainManager }