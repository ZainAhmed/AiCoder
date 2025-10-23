"use client";
import React, { useCallback, useState, useEffect } from "react";
import { Box } from "@mui/material";
import DropArea from "./DropArea";
import ImagePreview from "./ImagePreview";
import ActionButtons from "./ActionButtons";

export interface FileWithPreview {
  file: File;
  preview: string;
  uploadedUrl: string;
}

export default function ImageDropzone() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const uploadFile = async (file: File): Promise<FileWithPreview> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    return {
      file,
      preview: URL.createObjectURL(file),
      uploadedUrl: data.url,
    };
  };

  const handleDrop = useCallback(async (accepted: File[]) => {
    const uploadedFiles = await Promise.all(accepted.map(uploadFile));
    setFiles((prev) => [...prev, ...uploadedFiles]);
  }, []);

  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.preview));
    };
  }, [files]);

  const generateCode = async () => {
    const imageUrls = files.map((file) => file.uploadedUrl);
    await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imageUrls),
    });
  };

  const removeImage = (uploadedUrl: string) => {
    setFiles((prev) => prev.filter((f) => f.uploadedUrl !== uploadedUrl));
  };
  return (
    <Box>
      <DropArea onDrop={handleDrop} />
      <ImagePreview
        files={files}
        onRemove={(uploadedUrl) => removeImage(uploadedUrl)}
      />

      <ActionButtons files={files} onGenerate={generateCode} />
    </Box>
  );
}
