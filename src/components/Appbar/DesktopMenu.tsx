"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface DesktopMenuProps {
  pages: string[];
  onClick: () => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ pages, onClick }) => (
  <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
    {pages.map((page) => (
      <Button
        key={page}
        onClick={onClick}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        {page}
      </Button>
    ))}
  </Box>
);

export default DesktopMenu;
