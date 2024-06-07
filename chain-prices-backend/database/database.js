const { Sequelize } = require("sequelize");
const user = require("../models/user");
const transaction = require("../models/transaction");
const product = require("../models/product");
const vendor = require("../models/vendor");
const inventory = require("../models/inventory");
const inventoryItem = require("../models/inventoryItem");
const ingredient = require("../models/ingredient");

class Database {
  constructor() {
    this.user = process.env.POSTGRES_USER;
    this.password = process.env.POSTGRES_PASSWORD;
    this.host = process.env.POSTGRES_HOST;
    this.port = process.env.POSTGRES_PORT;
    this.dbName = process.env.POSTGRES_DB_NAME;

    this.#prepareClient();
    this.#connectDatabase();
    this.#createAllTable();
  }

  #prepareClient() {
    const connectionString = `postgres://${this.user}:${this.password}@${this.host}:${this.port}/${this.dbName}`;
    this.client = new Sequelize(connectionString, {logging: false});
  }

  #connectDatabase() {
    this.client.authenticate()
      .then((res) => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
  }

  #createAllTable() {
    this.#getAllTableList();

    this.client.sync({ alter: true })
      .then(() => {
        console.log("All models were synchronized successfully.");
      })
      .catch((err) => {
        console.log("Something went wrong while sync models!", err);
      });
  }

  #getAllTableList() {
    user.callback(this.client);
    transaction.callback(this.client);
    ingredient.callback(this.client);
    product.callback(this.client);
    inventoryItem.callback(this.client);
    inventory.callback(this.client);
    vendor.callback(this.client);
  }
}

module.exports = Database;
