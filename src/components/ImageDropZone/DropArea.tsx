"use client";
import { Box, Paper, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import React from "react";

interface DropAreaProps {
  onDrop: (files: File[]) => void;
}

export default function DropArea({ onDrop }: DropAreaProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <Box {...getRootProps()} sx={{ outline: "none" }}>
      <input {...getInputProps()} />
      <Paper
        variant="outlined"
        sx={{
          width: "80vh",
          height: "50vh",
          textAlign: "center",
          borderStyle: "dashed",
          borderWidth: 3,
          borderColor: "primary.main",
          borderRadius: 6,
          bgcolor: "#F5F5F5",
          opacity: 0.8,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body1" color="primary.main">
          {isDragActive
            ? "Drop images here …"
            : "Drag & drop images here, or click to select files"}
        </Typography>
      </Paper>
    </Box>
  );
}
