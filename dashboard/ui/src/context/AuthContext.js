import { createContext, useContext, useEffect, useState } from "react";
import AuthService from "../services/AuthService";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: {},
  });

  const userLoggedIn = ({ user, accessToken, refreshToken }) => {
    setAuth({
      isAuthenticated: true,
      user,
      accessToken,
      refreshToken,
    });
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { user, userId } = await AuthService.verify();
        const [accessToken, refreshToken] = AuthService.getTokens();

        setAuth((state) => ({
          ...state,
          user,
          isAuthenticated: true,
          accessToken,
          refreshToken,
        }));
      } catch (error) {
        console.error(error.message);
      }
    };

    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, userLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
