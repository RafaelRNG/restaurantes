import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import UserRoute from "./routes/User.route";
import { environment } from "./utils/environment";
import RestaurantRoutes from "./routes/Restaurant.route";
import ReviewRoute from "./routes/Review.route";
import versionRoutes from "express-routes-versioning";
import { authenticate } from "./security/Auth.handler";

class Server {

   public server: express.Application;
   public version: versionRoutes.RoutesVersioningMiddleware;

   public constructor() {
      this.server = express();
      this.version = versionRoutes();
      this.applyMiddlewares();
      this.initRoutes();
      this.initializeDatabase();
   }

   private applyMiddlewares(): void {
      this.server.use(express.json());
      this.server.use(express.query({}))

   }

   private initRoutes(): void {
      this.server.use((request: Request, response: Response, next: NextFunction) => {
         request.httpVersion = <any>request.headers['accept-version']
         next();
      })

      this.server.use("/users", this.version({
         "1.0.0": UserRoute,
         "2.0.0": (request, response, next) => {
            return response.json({
               message: "for future releases!",
               instructions: "Please add a header in the request of type 'accept-version' with value '1.0.0', to get access to previous version while working on version 2.0.0!"
            });
         }
      }));
      this.server.use("/restaurants", RestaurantRoutes);
      this.server.use("/reviews", ReviewRoute);
      this.server.post("/authenticate", authenticate);
   }

   private initializeDatabase(): Promise<typeof mongoose> {
      mongoose.Promise = global.Promise;
      return mongoose.connect(environment.db.url);
   }
}

export default new Server().server;