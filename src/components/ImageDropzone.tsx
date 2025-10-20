"use client";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Paper, Typography } from "@mui/material";

interface FileWithPreview extends File {
  preview: string;
  uploadedUrl: string;
}

export default function ImageDropzone() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback(async (accepted: File[]) => {
    const uploadedFiles: FileWithPreview[] = await Promise.all(
      accepted.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        const parts = data.url.split("/");
        const uploadedUrl = parts[parts.length - 1];
        return {
          ...file,
          preview: URL.createObjectURL(file),
          uploadedUrl: uploadedUrl,
        } as FileWithPreview;
      })
    );

    setFiles((prev) => [...prev, ...uploadedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);
  const generateCode = () => {
    console.log(files);
  };
  return (
    <>
      <Box>
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
            }}
          >
            {isDragActive ? (
              <Typography variant="body1" color="primary.main">
                Drop images here …
              </Typography>
            ) : (
              <Typography variant="body1" color="primary.main">
                Drag & drop images here, or click to select files
              </Typography>
            )}
          </Paper>
        </Box>
        {/* Preview */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <div>
            {files.map((file, index) => (
              <img
                key={file.uploadedUrl}
                src={file.preview}
                alt={file.uploadedUrl}
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            ))}
          </div>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => generateCode()}
            sx={{ alignSelf: "flex-start", marginTop: 2 }}
          >
            Generate Code
          </Button>
        </Box>
      </Box>
    </>
  );
}
