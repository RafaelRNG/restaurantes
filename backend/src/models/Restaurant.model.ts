import { Schema, model, Document } from "mongoose";

export interface MenuItem extends Document {
   name: string;
   price: number;
}

export interface RestaurantDocument extends Document {
   name: string;
   menu: MenuItem[];
}

const menuSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   }
});

const restaurantSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   menu: {
      type: [menuSchema],
      required: false,
      select: false,
      default: []
   }
});

export const RestaurantModel = model<RestaurantDocument>("Restaurants", restaurantSchema);