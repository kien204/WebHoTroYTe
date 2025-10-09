import RouterCustom from "./routes/RouterCustom";

import { ToastProvider } from "./common//context/ToastContext";
import { AuthProvider } from "./common/context/AuthProvider";
import { LoadingProvider } from "./common/context/LoadingProvider";

function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <ToastProvider>
          <RouterCustom />
        </ToastProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}

export default App;
