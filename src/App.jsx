import { useEffect } from "react";
import RouterCustom from "./routes/RouterCustom";
import { useToast } from "./common/hooks/useToast";
import { setGlobalToast } from "./services/api";

function App() {
  const { showToast } = useToast();

  useEffect(() => {
    setGlobalToast(showToast);
  }, [showToast]);

  return <RouterCustom />;
}

export default App;
