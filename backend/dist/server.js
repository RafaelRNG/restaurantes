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
    };
    Server.prototype.initRoutes = function () {
        this.server.use(function (request, response, next) {
            //@ts-ignore
            request.httpVersion = request.header("accept-version");
            next();
        });
        this.server.use("/users", this.version({
            "1.0.0": User_route_1.default
        }));
        this.server.use("/restaurants", Restaurant_route_1.default);
        this.server.use("/reviews", Review_route_1.default);
    };
    Server.prototype.initializeDatabase = function () {
        mongoose_1.default.Promise = global.Promise;
        return mongoose_1.default.connect(environment_1.environment.db.url);
    };
    return Server;
}());
exports.default = new Server().server;