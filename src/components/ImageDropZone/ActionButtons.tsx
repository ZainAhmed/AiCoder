"use client";
import { Button } from "@mui/material";
import React from "react";
import { FileWithPreview } from "./ImagePreview";

interface ActionButtonsProps {
  files: FileWithPreview[];
  onGenerate: () => void;
}

export default function ActionButtons({
  files,
  onGenerate,
}: ActionButtonsProps) {
  if (files.length === 0) return null;

  return (
    <Button
      color="secondary"
      variant="contained"
      onClick={onGenerate}
      sx={{ mt: 2 }}
    >
      Generate Code
    </Button>
  );
}
