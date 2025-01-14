import "./App.css";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { Routes } from "react-router";
import { Route } from "react-router";
import AppLayout from "./modules/AppLayout";
import { ModuleRegistry } from "./core/registry";

function App() {
  const routes = ModuleRegistry.getRoutes();
  const lightTheme = createTheme({
    typography: {
      fontFamily: ["Source Sans 3", "sans-serif"].join(","),
    },
    palette: {
      mode: "light",
      primary: {
        main: "#002b5b",
      },
      secondary: {
        main: "#00a3a3",
        light: "#c6cfd8",
      },
      success: {
        main: "#289f50",
      },
      warning: {
        main: "#e5ab4a",
        dark: "#f77a4a",
      },
      common: {
        white: "#fff",
        black: "#000",
      },
    },
  });
  return (
    <ThemeProvider theme={lightTheme}>
      <Routes>
        <Route path="/" element={<Box>Hi</Box>} />
        <Route path="/app" element={<Box>App</Box>} />

        <Route element={<AppLayout />}>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
