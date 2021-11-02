import { Schema, model, Document, Types } from "mongoose";
import { RestaurantDocument } from "./Restaurant.model";
import { UserDocument } from "./User.model";

export interface ReviewDocument extends Document {
   date: Date;
   rating: number;
   comments: string;
   restaurant: Types.ObjectId | RestaurantDocument;
   user: Types.ObjectId | UserDocument;
}

const reviewSchema = new Schema({
   date: {
      type: Date,
      required: true
   },
   rating: {
      type: Number,
      required: true
   },
   comments: {
      type: String,
      required: true,
      maxLength: 500
   },
   restaurant: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Restaurants"
   },
   user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
   }
});

export const ReviewModel = model<ReviewDocument>("Reviews", reviewSchema);