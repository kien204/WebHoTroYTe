import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

import infoApi from "../../services/api/infoAPI";
import { useApi } from "../../common/hooks/useApi";
import { useToast } from "../../common/hooks/useToast";

export const AuthProvider = ({ children }) => {
  const { showToast } = useToast();
  const { callApi } = useApi(showToast);
  const [auth, setAuth] = useState(() => {
    const data = localStorage.getItem("auth");
    return data ? JSON.parse(data) : null;
  });
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) return;

    const fetchInfo = async () => {
      try {
        const res = await callApi(
          () => infoApi.getByTaiKhoanId(auth.id),
          false
        );
        setProfile(res);
      } catch {
        //
      }
    };

    fetchInfo();
  }, [auth?.id, auth?.check]);

  const login = (auth, token) => {
    localStorage.setItem("auth", JSON.stringify(auth));
    localStorage.setItem("token", token);
    setAuth(auth);
    if (auth.role == "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    setAuth(null);
    setProfile(null);
    navigate("/login", { replace: true });
  };

  const updateAuth = (updatedauth) => {
    setAuth(updatedauth);
    localStorage.setItem("auth", JSON.stringify(updatedauth));
  };

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
  };

  return (
    <AuthContext.Provider
      value={{ auth, profile, login, logout, updateAuth, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
