const { v4: uuidv4 } = require("uuid");

const users = [
  {
    UserID: uuidv4(),
    fullname: "Jhon Doe",
    email: "jhon@doe.com",
    hash: "$argon2id$v=19$m=65536,t=3,p=4$rSziom71o3iT15lRR7waoA$FFDLtirj/OGH8b1WimBDmERWb9h/LYu3dQKiBl5b5Bk",
  },
  {
    UserID: uuidv4(),
    fullname: "Hello World",
    email: "hello@world.com",
    hash: "$argon2id$v=19$m=65536,t=3,p=4$rSziom71o3iT15lRR7waoA$FFDLtirj/OGH8b1WimBDmERWb9h/LYu3dQKiBl5b5Bk",
  },
];

class Auth {
  constructor() {}

  getUsers() {
    return Promise.resolve(users);
  }

  getUserByEmail({ email }) {
    const user = users.find((u) => u.email === email);

    if (!user) {
      return Promise.reject(new Error("There is no user"));
    }

    return Promise.resolve(user);
  }

  getUserById({ userId }) {
    const user = users.find((u) => u.UserID === userId);

    if (!user) {
      return Promise.reject(new Error("There is no user"));
    }

    return Promise.resolve(user);
  }

  setRefreshToken({userId, refreshToken}){
    // in real application I will set the refresh token in a separte cache-db like redis. { userId: refreshToken }
    
    const userIndex = users.findIndex(u => u.UserID === userId);
    users[userIndex].refreshToken = refreshToken;

    return {
      user: users[userIndex],
    }
  }
}

module.exports = new Auth();
