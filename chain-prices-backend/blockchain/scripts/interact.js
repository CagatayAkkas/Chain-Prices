import { ethers } from "./ethers-5.6.esm.min.js";

const contractAddress = "0xE61e3151b10b689822E7F5fEdcF243ffD80c06b3";
// https://api-sepolia.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0xE61e3151b10b689822E7F5fEdcF243ffD80c06b3&api_key=AsRLVXZLZMPKrruB1nFRRSGfSquRWJtA
const privateKey =
  "b54c98a545e24a6a4c7e0c0fd4c228e60c1e77cb09e29564e7463d7670273a4e";
const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-sepolia.g.alchemy.com/v2/AsRLVXZLZMPKrruB1nFRRSGfSquRWJtA"
);
const contractAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_amountOfProduct",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_priceOfTheProduct",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_productCode",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_marketAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
    ],
    name: "Transaction",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_amountOfProduct",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_priceOfTheProduct",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_productCode",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_marketAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
    ],
    name: "buyRequest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bool",
        name: "_punishment",
        type: "bool",
      },
    ],
    name: "punishment",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "moneyAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "marketAddress",
        type: "address",
      },
    ],
    name: "addMoney",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "totalPrice",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "marketAddress",
        type: "address",
      },
    ],
    name: "buyProduct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "marketAddress",
        type: "address",
      },
    ],
    name: "checkDept",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "marketAddress",
        type: "address",
      },
    ],
    name: "checkVault",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "dept",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "penaltyFee",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "guiltyAddress",
        type: "address",
      },
    ],
    name: "punish",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOfProduct",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalPrice",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "addressOfProduct",
        type: "address",
      },
      {
        internalType: "address",
        name: "marketAddress",
        type: "address",
      },
    ],
    name: "requestProduct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "s_marketAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_priceOfTheProduct",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_productCode",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOfProduct",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_priceOfTheProduct",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_productCode",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_marketAddress",
        type: "address",
      },
    ],
    name: "transaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "vault",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const wallet = new ethers.Wallet(privateKey, provider);

const myContract = new ethers.Contract(contractAddress, contractAbi, wallet);

export async function addMoney(_moneyAmount, _marketAddress) {
  if (_moneyAmount instanceof HTMLInputElement) {
    _moneyAmount = _moneyAmount.value;
  }
  if (_marketAddress instanceof HTMLInputElement) {
    _marketAddress = _marketAddress.value;
  }
  const tx = await myContract.addMoney(Number(_moneyAmount), _marketAddress);
  console.log("Money sent to: ", _marketAddress);
}
export async function transaction(
  _amountOfProduct,
  _priceOfTheProduct,
  _productCode,
  _marketAddress
) {
  if (_marketAddress instanceof HTMLInputElement) {
    _marketAddress = _marketAddress.value;
  }

  if (_amountOfProduct instanceof HTMLInputElement) {
    _amountOfProduct = _amountOfProduct.value;
  }

  if (_priceOfTheProduct instanceof HTMLInputElement) {
    _priceOfTheProduct = _priceOfTheProduct.value;
  }

  if (_productCode instanceof HTMLInputElement) {
    _productCode = _productCode.value;
  }

  console.log("Amount of Product is:", Number(_amountOfProduct));
  console.log("Price of Product is:", Number(_priceOfTheProduct));
  console.log("Product Code is:", Number(_productCode));
  console.log("Market Address is:", _marketAddress);

  const tx = await myContract.transaction(
    Number(_amountOfProduct),
    Number(_priceOfTheProduct),
    Number(_productCode),
    _marketAddress
  );
  console.log({ tx });
  console.log("Transaction hash:", tx.hash);
}
export async function applyPenalty(_penaltyFee, _guiltyAddress) {
  if (_penaltyFee instanceof HTMLInputElement) {
    _penaltyFee = _penaltyFee.value;
  }
  if (_guiltyAddress instanceof HTMLInputElement) {
    _guiltyAddress = _guiltyAddress.value;
  }
  const tx = await myContract.punish(Number(_penaltyFee), _guiltyAddress);
  console.log("Penalty applied to: ", _guiltyAddress);
}

export async function requestProduct(
  _amountOfProduct,
  _totalPrice,
  _productAddress,
  _marketAddress
) {
  if (_amountOfProduct instanceof HTMLInputElement) {
    _amountOfProduct = _amountOfProduct.value;
  }
  if (_totalPrice instanceof HTMLInputElement) {
    _totalPrice = _totalPrice.value;
  }
  if (_productAddress instanceof HTMLInputElement) {
    _productAddress = _productAddress.value;
  }
  if (_marketAddress instanceof HTMLInputElement) {
    _marketAddress = _marketAddress.value;
  }
  const tx = await myContract.requestProduct(
    Number(_amountOfProduct),
    Number(_totalPrice),
    _productAddress,
    _marketAddress
  );
  console.log("Product requested from: ", _productAddress);
}

export async function vaultCheck(_marketAddress) {
  if (_marketAddress instanceof HTMLInputElement) {
    _marketAddress = _marketAddress.value;
  }
  const vaultValue = await myContract.checkVault(_marketAddress);
  console.log("Vault Value is:", Number(vaultValue));
}

export async function deptCheck(_marketAddress) {
  if (_marketAddress instanceof HTMLInputElement) {
    _marketAddress = _marketAddress.value;
  }
  const deptValue = await myContract.checkDept(_marketAddress);
  console.log("Dept Value is:", Number(deptValue));
}

export async function connectExecute(contract2, _marketAddress) {
  const deptValue2 = await contract2.checkDept(_marketAddress);
  console.log("Dept Value is:", Number(deptValue2));
}

async function execute() {}
