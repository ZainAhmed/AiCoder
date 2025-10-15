"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import GitHubIcon from "@mui/icons-material/GitHub";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

function HomePageGroupButtons() {
  const [selected, setSelected] = useState("create"); // default selected
  const router = useRouter();

  const handleClick = (page: "create" | "modify") => {
    setSelected(page);
    if (page === "create") {
      router.push("/create"); // navigate to create page
    } else {
      router.push("/modify"); // navigate to modify page
    }
  };

  return (
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button
        color={selected === "create" ? "secondary" : "primary"}
        startIcon={<AddIcon />}
        onClick={() => handleClick("create")}
      >
        Create New App
      </Button>
      <Button
        color={selected === "modify" ? "secondary" : "primary"}
        startIcon={<GitHubIcon />}
        onClick={() => handleClick("modify")}
      >
        Modify Repo from Image
      </Button>
    </ButtonGroup>
  );
}

export default HomePageGroupButtons;
