import http from "./http";

class AuthService {
  async login({ email, password }) {
    return http.post("auth/login", {
      email,
      password,
    });
  }

  verify() {
    const [accessToken, refreshToken] = this.getTokens();

    if (!accessToken || !refreshToken) {
      return Promise.reject(new Error("Missing token"));
    }

    return http
      .get("auth/verify")
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  setTokens({ accessToken, refreshToken }) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  getTokens() {
    return [
      localStorage.getItem("accessToken"),
      localStorage.getItem("refreshToken"),
    ];
  }
}

export default new AuthService();
