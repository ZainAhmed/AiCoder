"use client";
import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { FileWithPreview } from "./ImageDropzone";

interface ImagePreviewProps {
  files: FileWithPreview[];
  onRemove: (uploadedUrl: string) => void;
}

export default function ImagePreview({ files, onRemove }: ImagePreviewProps) {
  return (
    <Box
      sx={{
        mt: 2,
        display: "grid",
        gap: 2,
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
        },
      }}
    >
      {files.map((f) => (
        <Box
          key={f.uploadedUrl}
          sx={{
            position: "relative",
            width: "100%",
            paddingTop: "100%",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Image
            src={f.preview}
            alt={f.uploadedUrl}
            fill
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />
          <IconButton
            onClick={() => onRemove(f.uploadedUrl)}
            size="small"
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}
