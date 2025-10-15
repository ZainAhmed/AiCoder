"use client";
import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "../utils/theme";

function MuiThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default MuiThemeProvider;
