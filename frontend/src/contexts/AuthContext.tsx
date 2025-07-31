import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData, login } from "../service/userService";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = React.createContext<{
  user: User | null;
  token: string | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
} | null>(null);

type Book = {
  title: string;
};

type User = {
  name: string;
  email: string;
  books: Book[];
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error(
      "useAuthContext precisa ser utilizado dentro de AuthContextProvider"
    );
  }
  return context;
};

export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useLocalStorage("token");
  const navigate = useNavigate();

  React.useEffect(() => {
    const requestData = async () => {
      const previousToken = localStorage.getItem("token");
      if (previousToken) {
        const response = await getData(previousToken);
        const data = response.data;
        setUser(data.user);
        setToken(previousToken);
        console.log(previousToken);
      }
    };
    requestData();
  }, [token]);

  const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password);
    const data = response.data;
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
