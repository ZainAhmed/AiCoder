"use client";
import * as React from "react";
import DeblurIcon from "@mui/icons-material/Deblur";
import Typography from "@mui/material/Typography";
import { APP_NAME } from "@/utils/constants";

interface LogoProps {
  variant: "desktop" | "mobile";
}

const Logo: React.FC<LogoProps> = ({ variant }) => {
  const isMobile = variant === "mobile";
  return (
    <>
      <DeblurIcon
        sx={{
          display: {
            xs: isMobile ? "flex" : "none",
            md: isMobile ? "none" : "flex",
          },
          mr: 1,
        }}
      />
      <Typography
        variant={isMobile ? "h5" : "h6"}
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 2,
          display: {
            xs: isMobile ? "flex" : "none",
            md: isMobile ? "none" : "flex",
          },
          flexGrow: isMobile ? 1 : 0,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {APP_NAME}
      </Typography>
    </>
  );
};

export default Logo;
