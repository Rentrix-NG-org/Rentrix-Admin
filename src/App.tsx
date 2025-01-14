import "./App.css";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router";
import { Routes } from "react-router";
import { Route } from "react-router";
import AppLayout from "./pages/app/Layout";

function App() {
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#002b5b",
      },
      secondary: {
        main: "#00a3a3",
      },
      success: {
        main: "#289f50",
      },
      warning: {
        main: "#e5ab4a",
        dark: "#f77a4a",
      },
    },
  });
  return (
    <ThemeProvider theme={lightTheme}>
      <Routes>
        <Route path="/" element={<Box>Hi</Box>} />
        <Route path="/app" element={<Box>App</Box>} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Box>Dashboard</Box>} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
