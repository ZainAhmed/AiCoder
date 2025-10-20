"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import GitHubIcon from "@mui/icons-material/GitHub";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

function HomePageGroupButtons() {
  const [selected, setSelected] = useState("new"); // default selected
  const router = useRouter();

  const handleClick = (page: "new" | "modify") => {
    setSelected(page);
    if (page === "new") {
      router.push("/create/new");
    } else {
      router.push("/create/modify");
    }
  };

  return (
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button
        color={selected === "new" ? "secondary" : "primary"}
        startIcon={<AddIcon />}
        onClick={() => handleClick("new")}
      >
        Create New App
      </Button>
      <Button
        color={selected === "modify" ? "secondary" : "primary"}
        startIcon={<GitHubIcon />}
        onClick={() => handleClick("modify")}
      >
        Modify App from Image
      </Button>
    </ButtonGroup>
  );
}

export default HomePageGroupButtons;
