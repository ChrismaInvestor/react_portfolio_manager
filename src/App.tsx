import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter } from "react-router-dom";
import Routes from "./routes";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes />
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
