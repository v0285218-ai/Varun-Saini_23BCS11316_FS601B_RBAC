import React, { createContext, useContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const ThemeContext = createContext();
export const useThemeMode = () => useContext(ThemeContext);

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState("dark");

  const toggleMode = () => setMode((m) => (m === "dark" ? "light" : "dark"));

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'dark' ? '#0b0f14' : '#f5f7fb',
        paper: mode === 'dark' ? '#0f1720' : '#ffffff'
      },
      primary: { main: '#7c4dff' },
      secondary: { main: '#00e5ff' },
      text: { primary: mode === 'dark' ? '#e6eef8' : '#102027', secondary: mode === 'dark' ? '#a9b8c8' : '#44515a' }
    },
    shape: { borderRadius: 10 },
    components: {
      MuiPaper: { styleOverrides: { root: { boxShadow: mode === 'dark' ? '0 6px 20px rgba(2,6,23,0.7)' : '0 4px 18px rgba(16,24,40,0.06)' } } },
      MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 10 } } }
    }
  }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
