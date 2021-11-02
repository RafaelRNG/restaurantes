import { UserModel } from "../models/User.model";

interface InterfaceUserValidation {
   isValid: boolean;
   responses: string[];
}

export class UserValidation {

   public userValidations: InterfaceUserValidation = {
      isValid: false,
      responses: []
   }

   constructor() { }

   public userIsValid(body: any): InterfaceUserValidation {
      if (body.email === undefined || body.email === null) {
         this.userValidations.responses.push("Email is riquired!");
      }

      if (body.password === undefined || body.password === null) {
         this.userValidations.responses.push("password is riquired!");
      }

      if (body.name === undefined || body.name === null) {
         this.userValidations.responses.push("name is riquired!");
      }

      if (body.name.length > 80 || body.name.length < 3) {
         this.userValidations.responses.push("name is not valid!");
      }

      if (body.gender !== "Male" && body.gender !== "Female") {
         this.userValidations.responses.push("only 'Male' or 'Female' values for gender!");
      }

      if (this.userValidations.responses.length === 0) {
         this.userValidations.isValid = true;
      }

      return this.userValidations;
   }

   public isEmail(email: string) {

      return UserModel.findOne({ "email": email })
         .then(value => {
            if (value === null) {
               return false;
            } else {
               return true;
            }
         })
   }
}