import { BrowserRouter } from "react-router-dom";

import { AppProvider } from "./providers";
import Routes from "./routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
