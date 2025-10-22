"use client";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

interface NavMenuProps {
  pages: string[];
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}

const NavMenu: React.FC<NavMenuProps> = ({
  pages,
  anchorEl,
  open,
  onClose,
}) => (
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
    {pages.map((page) => (
      <MenuItem key={page} onClick={onClose}>
        <Typography textAlign="center">{page}</Typography>
      </MenuItem>
    ))}
  </Menu>
);

export default NavMenu;
