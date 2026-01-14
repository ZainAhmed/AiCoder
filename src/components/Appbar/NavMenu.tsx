"use client";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

interface NavMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  navLinks: string[]
}

const NavMenu: React.FC<NavMenuProps> = ({navLinks, anchorEl, open, onClose }) => {
  
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={open}
      onClose={onClose}
      sx={{ display: { xs: "block", md: "none" } }}
    >
      {navLinks.map((navLink) => (
        <MenuItem key={navLink} onClick={onClose}>
          <Typography textAlign="center">{navLink}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default NavMenu;
