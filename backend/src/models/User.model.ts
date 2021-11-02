import { Schema, model, Document } from "mongoose";
import { environment } from "../utils/environment";
import { hash } from "bcrypt";

export interface UserDocument extends Document {
   name: string;
   email: string;
   password: string;
   gender: ["Male", "Female"];
   cpf: string;
}

const userSchema = new Schema({
   name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 80
   },
   email: {
      type: String,
      unique: true,
      required: true,
      match: environment.model.emailValidation
   },
   password: {
      type: String,
      required: true
   },
   gender: {
      type: String,
      required: false,
      enum: ["Male", "Female"]
   },
   cpf: {
      type: String,
      required: false
   }
});

userSchema.pre("save", function (next) {
   const user: UserDocument = this;

   if (!user.isModified("password")) {
      next();
   } else {
      hash(user.password, 10)
         .then(hash => {
            user.password = hash
            next();
         })
         .catch(next)
   }
});

export const UserModel = model<UserDocument>("User", userSchema);