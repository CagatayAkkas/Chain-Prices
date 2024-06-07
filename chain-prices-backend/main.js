require('dotenv').config()
const Database = require('./database/database');
const ServerChainPrices = require('./server/serverChainPrices');
const { getTransactionsTask, syncProductDatabase, syncIngredients } = require('./cron/cron');

const database = new Database();
const server = new ServerChainPrices(database);
getTransactionsTask.start();
syncProductDatabase.start();
syncIngredients.start();
server.run();