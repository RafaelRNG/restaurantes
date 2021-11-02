const Users = [
   { id: "1", name: "Peter Parker", email: "peter@marvel.com" },
   { id: "2", name: "Bruce wayne", email: "Bruce@dc.com" }
]

export class UserMock {
   static findAll(): Promise<any> {
      return new Promise((resolve, reject) => {
         try {
            return resolve(Users);
         } catch (error) {
            reject(error);
         }
      })
   }

   static findById(id: string): Promise<any> {
      const user = Users.filter(u => u.id === id);

      return new Promise((resolve, reject) => {
         try {
            resolve(user);
         } catch (e) {
            reject(e);
         }
      })
   }
}