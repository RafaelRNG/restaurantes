import { Schema, model, Model, Document } from "mongoose";
import { environment } from "../utils/environment";
import { hash, compareSync } from "bcrypt";

export interface UserDocument extends Document {
   name: string;
   email: string;
   password: string;
   gender: ["Male", "Female"];
   cpf: string;
   profiles: string[];
   matches(password: string): boolean;
   hasAny(...profiles: string[]): boolean;
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
   },
   profiles: {
      type: [String],
      required: false
   }
});

userSchema.methods.matches = function (password: string): boolean {
   return compareSync(password, this.password)

}

userSchema.methods.hasAny = function (...profiles: string[]): boolean {
   return profiles.some(profile => this.profiles.indexOf(profile) !== -1)
}

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