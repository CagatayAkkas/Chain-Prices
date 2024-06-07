import { ethers } from "./ethers-5.6.esm.min.js";

import {
  addMoney,
  transaction,
  applyPenalty,
  requestProduct,
  vaultCheck,
  deptCheck,
  connectExecute,
} from "./interact.js";
const addMoneyButton = document.getElementById("addMoneyButton");
const createTransactionButton = document.getElementById(
  "createTransactionButton"
);
const applyPenaltyButton = document.getElementById("applyPenaltyButton");
const requestProductButton = document.getElementById("requestProductButton");
const checkVaultButton = document.getElementById("checkVaultButton");
const checkDeptButton = document.getElementById("checkDeptButton");
const connectButton = document.getElementById("connectButton");

addMoneyButton.addEventListener("click", function () {
  const moneyAmount = document.getElementById("moneyAmount").value;
  const marketAddress = document.getElementById("marketAddress").value;

  addMoney(moneyAmount, marketAddress);
});

createTransactionButton.addEventListener("click", function () {
  const amountOfProduct = document.getElementById("amountOfProduct").value;
  const priceOfTheProduct = document.getElementById("priceOfProduct").value;
  const productCode = document.getElementById("productCode").value;
  const marketAddress = document.getElementById("marketAddress").value;

  transaction(amountOfProduct, priceOfTheProduct, productCode, marketAddress);
});

applyPenaltyButton.addEventListener("click", function () {
  const penaltyFee = document.getElementById("penaltyFee").value;
  const guiltyAddress = document.getElementById("guiltyAddress").value;

  applyPenalty(penaltyFee, guiltyAddress);
});

requestProductButton.addEventListener("click", function () {
  const amountOfProduct = document.getElementById("amountOfProduct").value;
  const totalPrice = document.getElementById("totalPrice").value;
  const productAddress = document.getElementById("productAddress").value;
  const marketAddress = document.getElementById("marketAddress").value;

  requestProduct(amountOfProduct, totalPrice, productAddress, marketAddress);
});

checkVaultButton.addEventListener("click", function () {
  const marketAddress = document.getElementById("vaultAddress").value;
  vaultCheck(marketAddress);
});

checkDeptButton.addEventListener("click", function () {
  const marketAddress = document.getElementById("deptAddress").value;
  deptCheck(marketAddress);
});

connectButton.addEventListener("click", async function () {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    document.getElementById("connectButton").innerHTML = "Connected";
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  } else {
    document.getElementById("connectButton").innerHTML =
      "Please install MetaMask";
  }
  //console.log("hello world");
  // const contractAbi = []
  // const contractAddress = "0xE61e3151b10b689822E7F5fEdcF243ffD80c06b3";
  // const provider2 = new ethers.providers.Web3Provider(window.ethereum);
  // const signer2 = provider2.getSigner();
  // const contract2 = new ethers.Contract(contractAddress, contractAbi, signer2);
  // connectExecute(contract2, signer2.getAddress());
});
