"use client";
import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import GitHubIcon from "@mui/icons-material/GitHub";
import AddIcon from "@mui/icons-material/Add";
function HomePageGroupButtons() {
  return (
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button color="secondary" startIcon={<AddIcon />}>
        Create New App
      </Button>
      <Button startIcon={<GitHubIcon />}>Modify Repo from Image</Button>
    </ButtonGroup>
  );
}

export default HomePageGroupButtons;
