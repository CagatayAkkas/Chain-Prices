const { userManager } = require("../manager/userManager");
const BaseResponse = require("../models/response/baseResponse");
const JWTManager = require("../util/jwt");
const BaseServer = require("./baseServer");

class ServerChainPrices extends BaseServer {
  constructor(db = null) {
    super(process.env.SERVER_HOST, process.env.SERVER_PORT);

    this.db = db;
  }

  authMiddleware() {
    this.app.use((req, res, next) => {
      const url = req.originalUrl;
      const method = req.method;

      if (url.startsWith("/transaction") && method === "GET") {
        next();
      } else if (url === "/auth" && method === "POST") {
        next();
      } else if (url.startsWith("/product") && method === "GET") {
        next();
      } else {
        const authHeader = req.headers.authorization;
        if (authHeader === undefined) {
          res
            .status(401)
            .json(
              new BaseResponse("failed", "Unauthorized user!", {}).toJson()
            );
        } else {
          const token = new JWTManager().verifyToken(authHeader);
          if (token === null) {
            res
              .status(401)
              .json(
                new BaseResponse("failed", "Unauthorized user!", {}).toJson()
              );
          } else {
            next();
          }
        }
      }
    });
  }

  setupAdminMiddleware() {
    this.app.use((req, res, next) => {
      const url = req.originalUrl;
      const method = req.method;

      if (url === "/vendor" && method === "POST") {
        const authHeader = req.headers.authorization;
        const token = new JWTManager().verifyToken(authHeader);
        const userData = JSON.parse(token.data);

        userManager
          .findUserByIdentifier(userData.identifier)
          .then((user) => {
            if (user.role === "admin") {
              next();
            } else {
              res
                .status(403)
                .json(
                  new BaseResponse("failed", "Forbidden user!", {}).toJson()
                );
            }
          })
          .catch((err) => {
            res
              .status(404)
              .json(new BaseResponse("failed", "Forbidden user!", {}).toJson());
          });
      } else {
        next();
      }
    });
  }

  run() {
    this.setupMiddlewares();

    this.app.listen(this.port, this.host, () => {
      console.log(`Server is running on port ${this.host}:${this.port}`);
    });
  }

  setupMiddlewares() {
    this.authMiddleware();
    // this.setupAdminMiddleware()
  }
}

module.exports = ServerChainPrices;
