export class RestaurantValidation {

   public constructor() { }

   public isRestaurantValid(name: string): boolean {
      if (name === null || name === undefined || name.length < 3 || name.length > 200) {
         return false;
      }
      return true;
   }
}