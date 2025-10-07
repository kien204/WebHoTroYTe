import { useState } from "react";
import ReactDOM from "react-dom";
import LoadingOverlay from "../components/LoadingOverlay";
import { LoadingContext } from "./LoadingContext";

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {ReactDOM.createPortal(
        <LoadingOverlay visible={loading} />,
        document.body
      )}
      {children}
    </LoadingContext.Provider>
  );
};
