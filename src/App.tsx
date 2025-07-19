import ReactQueryProvider from "./providers/ReactQueryProvider";
import AuthContext from "./context/AuthContext";
import RoutesProvider from "./routes";
import { ToastProvider } from "./utils/ToastContext";

function App() {
  return (
    <ReactQueryProvider>
      <AuthContext>
        <ToastProvider>
          <RoutesProvider />
        </ToastProvider>
      </AuthContext>
    </ReactQueryProvider>
  );
}

export default App;
