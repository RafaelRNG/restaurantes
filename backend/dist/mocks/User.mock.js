"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMock = void 0;
var Users = [
    { id: "1", name: "Peter Parker", email: "peter@marvel.com" },
    { id: "2", name: "Bruce wayne", email: "Bruce@dc.com" }
];
var UserMock = /** @class */ (function () {
    function UserMock() {
    }
    UserMock.findAll = function () {
        return new Promise(function (resolve, reject) {
            try {
                return resolve(Users);
            }
            catch (error) {
                reject(error);
            }
        });
    };
    UserMock.findById = function (id) {
        var user = Users.filter(function (u) { return u.id === id; });
        return new Promise(function (resolve, reject) {
            try {
                resolve(user);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    return UserMock;
}());
exports.UserMock = UserMock;
