import RouterCustom from "./routes/RouterCustom";

import { ToastProvider } from "./common//context/ToastContext";
import { AuthProvider } from "./common/context/AuthProvider";
import { LoadingProvider } from "./common/context/LoadingProvider";
import { ChatWidgetProvider } from "./common/context/ChatWidgetProvider";
import { locale } from "primereact/api";
import "./common/locales/vietnameseLocale";

locale("vi");

function App() {
  return (
    <LoadingProvider>
      <ToastProvider>
        <AuthProvider>
          <ChatWidgetProvider>
            <RouterCustom />
          </ChatWidgetProvider>
        </AuthProvider>
      </ToastProvider>
    </LoadingProvider>
  );
}

export default App;
