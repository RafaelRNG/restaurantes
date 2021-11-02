import { isValidObjectId } from "mongoose";

interface InterfaceReviewValidation {
   responses: string[],
   isValid: boolean
}

export class isValidReview {

   private initialValues: InterfaceReviewValidation = {
      isValid: false,
      responses: []
   }

   reviewValidation(body: any) {
      if (body.date === undefined || body.date === null) this.initialValues.responses.push("Date is required!");
      if (body.rating === undefined || body.rating === null) this.initialValues.responses.push("Rating is required!");
      if (body.comments === undefined || body.comments === null) this.initialValues.responses.push("Comments is required!");
      if (body.comments.length > 500) this.initialValues.responses.push("maximum size of 500 characters!");
      if(body.restaurant === undefined || body.restaurant === null) this.initialValues.responses.push("Restaurant is required!");
      if(!isValidObjectId(body.restaurant)) this.initialValues.responses.push("_id of restaurant is invalid!");
      if(body.user === undefined || body.user === null) this.initialValues.responses.push("User is required!");
      if(!isValidObjectId(body.user)) this.initialValues.responses.push("_id of user is invalid!");

      if(this.initialValues.responses.length === 0) {
         this.initialValues.isValid = true;
      }

      return this.initialValues;
   }
}
//export const isValidReview = (body: any) => {

 /*
   const initialValues: InterfaceReviewValidation = {
      isValid: false,
      responses: []
   }
 */