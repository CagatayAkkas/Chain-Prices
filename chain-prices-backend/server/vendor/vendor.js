const ServerChainPrices = require("../serverChainPrices");
const Route = require("../../models/route");
const { vendorManager } = require("../../manager/vendorManager");
const BaseResponse = require("../../models/response/baseResponse");
const JWTManager = require("../../util/jwt");

class Vendor extends ServerChainPrices {
  getAllVendors() {
    return (req, res) => {
      vendorManager
        .getAllVendors()
        .then((result) => {
          res.status(200).json(new BaseResponse("success", "Vendor Lists", result).toJson());
        })
        .catch((err) => {
          res.status(400).json(new BaseResponse("failed", err.message, {}).toJson());
        });
    };
  }

  createVendor() {
    return (req, res) => {
      const body = req.body;
      const userId = body.userId;

      const authHeader = req.headers.authorization;
      const token = new JWTManager().verifyToken(authHeader);
      const userData = JSON.parse(token.data);

      vendorManager
        .createVendorByUserId(userData.userId, userId)
        .then((result) => {
          res.status(200).json(new BaseResponse("success", "Vendor successfully created.", {result}).toJson());
        })
        .catch((err) => {
          res.status(400).json(new BaseResponse("failed", err.message, {}).toJson());
        });
    };
  }

  checkRequestInventoryItem() {
    return (req, res) => {
      const authHeader = req.headers.authorization;
      const token = new JWTManager().verifyToken(authHeader);
      const userData = JSON.parse(token.data);
      const vendorUserId = userData.userId;
      const identifier = userData.identifier;

      const body = req.body;
      const items = body.items;

      vendorManager
        .checkRequestInventoryItem(identifier, vendorUserId, items)
        .then((result) => {
          res.status(200).json(new BaseResponse("success", "Items successfully checked", {...result}).toJson());
        })
        .catch((err) => {
          res.status(400).json(new BaseResponse("failed", err.message, {}).toJson());
        });
    };
  }

  finalizeRequestInventoryItem() {
    return (req, res) => {
      const authHeader = req.headers.authorization;
      const token = new JWTManager().verifyToken(authHeader);
      const userData = JSON.parse(token.data);
      const vendorUserId = userData.userId;
      const identifier = userData.identifier;

      const body = req.body;
      const items = body.items;

      vendorManager.finalizeRequestInventoryItem(identifier, vendorUserId, items)
        .then((result) => {
          res.status(200).json(new BaseResponse("success", "Items successfully requested", {...result}).toJson());
        })
        .catch((err) => {
          res.status(400).json(new BaseResponse("failed", err.message, {}).toJson());
        });
    };
  }

  getVendorInventory() {
    return (req, res) => {
      const body = req.body;
      const identifier = body.identifier;

      vendorManager.getAllVendorInventoryItems(identifier).then((result) => {
        res.status(200).json(new BaseResponse("success", "Vendor inventory list", result).toJson());
      }).catch((err) => {
        res.status(400).json(new BaseResponse("failed", err.message, {}).toJson());
      });
    }
  }

  run() {
    return [
      new Route(
        "get", 
        "/vendor", 
        this.getAllVendors()
      ),
      new Route(
        "post", 
        "/vendor", 
        this.createVendor()
      ),
      new Route(
        "post",
        "/vendor/check-request-item",
        this.checkRequestInventoryItem()
      ),
      new Route(
        "post",
        "/vendor/finalize-request-item",
        this.finalizeRequestInventoryItem()
      ),
      new Route(
        "post",
        "/vendor/inventory",
        this.getVendorInventory()
      )
    ];
  }
}

const vendor = new Vendor();
module.exports = vendor;
