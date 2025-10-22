"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      // main: "#1976d2", // blue
      main: "#1E3A8A",
    },
    secondary: {
      // main: "#b8114bff", // pink
      main: "#22D3EE",
    },
    background: {
      default: "hsl(214.3 31.8% 91.4%)", // light gray
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
    },
  },
});

export default theme;
