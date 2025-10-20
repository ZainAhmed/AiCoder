"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

export interface FileWithPreview {
  file: File;
  preview: string;
  uploadedUrl: string;
}

interface ImagePreviewProps {
  files: FileWithPreview[];
}

export default function ImagePreview({ files }: ImagePreviewProps) {
  return (
    <Box
      sx={{
        mt: 2,
        display: "grid",
        gap: 2,
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)", // 2 per row on mobile
          sm: "repeat(3, 1fr)", // 3 per row on tablets
          md: "repeat(4, 1fr)", // 4 per row on desktops
        },
      }}
    >
      {files.map((f) => (
        <Box
          key={f.uploadedUrl}
          sx={{
            position: "relative",
            width: "100%",
            paddingTop: "100%", // 1:1 aspect ratio
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Image
            src={f.preview}
            alt={f.uploadedUrl}
            fill
            style={{
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
      ))}
    </Box>
  );
}
