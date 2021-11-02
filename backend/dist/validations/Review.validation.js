"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidReview = void 0;
var mongoose_1 = require("mongoose");
var isValidReview = /** @class */ (function () {
    function isValidReview() {
        this.initialValues = {
            isValid: false,
            responses: []
        };
    }
    isValidReview.prototype.reviewValidation = function (body) {
        if (body.date === undefined || body.date === null)
            this.initialValues.responses.push("Date is required!");
        if (body.rating === undefined || body.rating === null)
            this.initialValues.responses.push("Rating is required!");
        if (body.comments === undefined || body.comments === null)
            this.initialValues.responses.push("Comments is required!");
        if (body.comments.length > 500)
            this.initialValues.responses.push("maximum size of 500 characters!");
        if (body.restaurant === undefined || body.restaurant === null)
            this.initialValues.responses.push("Restaurant is required!");
        if (!mongoose_1.isValidObjectId(body.restaurant))
            this.initialValues.responses.push("_id of restaurant is invalid!");
        if (body.user === undefined || body.user === null)
            this.initialValues.responses.push("User is required!");
        if (!mongoose_1.isValidObjectId(body.user))
            this.initialValues.responses.push("_id of user is invalid!");
        if (this.initialValues.responses.length === 0) {
            this.initialValues.isValid = true;
        }
        return this.initialValues;
    };
    return isValidReview;
}());
exports.isValidReview = isValidReview;
//export const isValidReview = (body: any) => {
/*
  const initialValues: InterfaceReviewValidation = {
     isValid: false,
     responses: []
  }
*/ 
