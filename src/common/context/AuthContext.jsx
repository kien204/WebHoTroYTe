import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

// custom hook để gọi gọn
export const useAuth = () => useContext(AuthContext);
