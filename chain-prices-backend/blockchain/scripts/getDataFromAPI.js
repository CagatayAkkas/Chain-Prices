const apiUrl =
  "https://api-sepolia.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0xE61e3151b10b689822E7F5fEdcF243ffD80c06b3&api_key=AsRLVXZLZMPKrruB1nFRRSGfSquRWJtA";

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    if (data.status === "1") {
      const logs = data.result;

      logs.forEach((log) => {
        const address = log.address;
        const topics = log.topics.map((topic) => BigInt(topic).toString());
        const data = log.data;
        const blockNumber = parseInt(log.blockNumber, 16);
        const blockHash = log.blockHash;
        const timeStamp = parseInt(log.timeStamp, 16);
        const gasPrice = parseInt(log.gasPrice, 16);
        const gasUsed = parseInt(log.gasUsed, 16);
        const logIndex = parseInt(log.logIndex, 16);
        const transactionHash = log.transactionHash;
        const transactionIndex = parseInt(log.transactionIndex, 16);

        // Extracting topics
        const contractAddress = address.toLowerCase();
        const amountOfProduct = Number(topics[1]);
        const priceOfProduct = Number(topics[2]);
        const productCode = Number(topics[3].slice(-40));

        // Extracting data
        const marketAddress = "0x" + data.slice(26, 66);
        //const contractAddressFromData = "0x" + data.slice(2, 42);

        console.log("Contract Address:", contractAddress);
        console.log("Amount of Product:", amountOfProduct);
        console.log("Price of Product:", priceOfProduct);
        console.log("Product Code:", productCode);
        console.log("Market Address:", marketAddress);
        //console.log("Contract Address (from data):", contractAddressFromData);
        console.log("Block Number:", blockNumber);
        console.log("Block Hash:", blockHash);
        console.log("Timestamp:", timeStamp);
        console.log("Gas Price:", gasPrice);
        console.log("Gas Used:", gasUsed);
        console.log("Log Index:", logIndex);
        console.log("Transaction Hash:", transactionHash);
        console.log("Transaction Index:", transactionIndex);
      });
    } else {
      console.error("Error:", data.message);
    }
  })
  .catch((error) => console.error("Fetch error:", error));
