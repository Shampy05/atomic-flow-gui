import "./App.css";
import { CssBaseline, ThemeProvider} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import {themeSettings} from "theme";
import {useMemo} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "scenes/layout";
import Canvas from "scenes/canvas";



function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes>
                    <Route path="/" element={<Layout />} />
                    <Route path="/" element={<Navigate to="/canvas" replace />} />
                    <Route path="/canvas" element={<Canvas />} />
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
