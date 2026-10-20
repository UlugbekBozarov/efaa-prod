import { AppProvider } from "./providers";
import Routes from "./routes/Routes";

function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
