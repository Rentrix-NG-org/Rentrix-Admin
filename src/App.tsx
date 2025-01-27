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
        light: "#f2f9f9",
        A400: "",
      },
      secondary: {
        main: "#00a3a3",
        light: "#c6cfd8",
      },
      success: {
        main: "#289f50",
      },
      background: {
        default: "#eef5f5",
      },
      warning: {
        main: "#e5ab4a",
        dark: "#f77a4a",
      },
      grey: {
        A100: "#eaeaea",
        A200: "#fcfdfd",
        "50": "#ededed",
        "100": "#f0f1f3",
        "200": "#f6f7f8",
        "300": "#dadde2",
        "400": "#98a2b3",
        "500": "#9fa6b2",
        "700": "#727677",
      },
      common: {
        white: "#fff",
        black: "#222522",
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
