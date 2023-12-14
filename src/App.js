import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Songs from "./scenes/songs";
import Albums from "./scenes/albums";
import Categories from "./scenes/categories";
import Artists from "./scenes/artists";
// import Languages from "./scenes/languages";
// import InternalAccounts from "./scenes/internal_account";
import UserAccounts from "./scenes/user_account";
// import Calendar from "./scenes/calendar";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/songs" element={<Songs />} />
              <Route path="/albums" element={<Albums />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/artists" element={<Artists />} />
              {/* <Route path="/languages" element={<Languages/>}/> */}
              {/* <Route path="/internal_account" element={<InternalAccounts/>}/> */}
              <Route path="/user_account" element={<UserAccounts />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
