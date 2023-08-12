import http from "./http";

class UsersService {
  getUsers() {
    return http
      .get("/auth")
      .then((res) => {
        const users = res.data.users;
        return Promise.resolve(users);
      })
      .catch((err) => Promise.reject(err));
  }
}

export default new UsersService();
