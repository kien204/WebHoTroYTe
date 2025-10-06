import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const data = localStorage.getItem("auth");
    return data ? JSON.parse(data) : null;
  });
  const [token, setToken] = useState(() => {
    const data = localStorage.getItem("token");
    return data ? JSON.parse(data) : null;
  });
  const navigate = useNavigate();

  const login = (auth, token) => {
    localStorage.setItem("auth", JSON.stringify(auth));
    localStorage.setItem("token", token);
    setAuth(auth);
    setToken(token);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    setAuth(null);
    setToken(null);
    navigate("/login", { replace: true });
  };

  const updateAuth = (updatedauth) => {
    setAuth(updatedauth);
    localStorage.setItem("auth", JSON.stringify(updatedauth));
  };

  return (
    <AuthContext.Provider value={{ auth, token, login, logout, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
