import express from "express";
import mongoose from "mongoose";
import UserRoute from "./routes/User.route";
import { environment } from "./utils/environment";
import RestaurantRoutes from "./routes/Restaurant.route";
import ReviewRoute from "./routes/Review.route";
import versionRoutes from "express-routes-versioning";

class Server {

   public server: express.Application;
   public version: any;

   public constructor() {
      this.server = express();
      this.version = versionRoutes();
      this.applyMiddlewares();
      this.initRoutes();
      this.initializeDatabase();
   }

   private applyMiddlewares(): void {
      this.server.use(express.json());
   }

   private initRoutes(): void {
      this.server.use((request, response, next) => {
         //@ts-ignore
         request.httpVersion = request.header("accept-version")
         next();
      })
      this.server.use("/users", this.version({
         "1.0.0": UserRoute
      }));
      this.server.use("/restaurants", RestaurantRoutes);
      this.server.use("/reviews", ReviewRoute);
   }

   private initializeDatabase(): Promise<typeof mongoose> {
      mongoose.Promise = global.Promise;
      return mongoose.connect(environment.db.url);
   }
}

export default new Server().server;