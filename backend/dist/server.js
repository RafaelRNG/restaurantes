"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var User_route_1 = __importDefault(require("./routes/User.route"));
var environment_1 = require("./utils/environment");
var Restaurant_route_1 = __importDefault(require("./routes/Restaurant.route"));
var Review_route_1 = __importDefault(require("./routes/Review.route"));
var express_routes_versioning_1 = __importDefault(require("express-routes-versioning"));
var Auth_handler_1 = require("./security/Auth.handler");
var Token_parser_1 = require("./security/Token.parser");
var Server = /** @class */ (function () {
    function Server() {
        this.server = express_1.default();
        this.version = express_routes_versioning_1.default();
        this.applyMiddlewares();
        this.initRoutes();
        this.initializeDatabase();
    }
    Server.prototype.applyMiddlewares = function () {
        this.server.use(express_1.default.json());
        this.server.use(express_1.default.query({}));
        this.server.use(Token_parser_1.tokenParser);
    };
    Server.prototype.initRoutes = function () {
        this.server.use(function (request, response, next) {
            request.httpVersion = request.headers['accept-version'];
            next();
        });
        this.server.use("/users", this.version({
            "1.0.0": User_route_1.default,
            "2.0.0": function (request, response, next) {
                return response.json({
                    message: "for future releases!",
                    instructions: "Please add a header in the request of type 'accept-version' with value '1.0.0', to get access to previous version while working on version 2.0.0!"
                });
            }
        }));
        this.server.use("/restaurants", Restaurant_route_1.default);
        this.server.use("/reviews", Review_route_1.default);
        this.server.post("/authenticate", Auth_handler_1.authenticate);
    };
    Server.prototype.initializeDatabase = function () {
        mongoose_1.default.Promise = global.Promise;
        return mongoose_1.default.connect(environment_1.environment.db.url);
    };
    return Server;
}());
exports.default = new Server().server;
