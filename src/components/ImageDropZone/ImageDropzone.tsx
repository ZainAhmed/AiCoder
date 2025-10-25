"use client";
import React, { useCallback, useState, useEffect } from "react";
import { Box } from "@mui/material";
import DropArea from "./DropArea";
import ImagePreview from "./ImagePreview";
import ActionButtons from "./ActionButtons";
import {
  useMutateUploadFile,
  useMutateGenerateCode,
  FileWithPreview,
} from "@/hooks/reactQueryHooks";
import LoadingIndicator from "@/components/LoadingIndicator";

export default function ImageDropzone() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  // ✅ Upload mutation — destructure what you need
  const {
    mutateAsync: uploadFile,
    isPending: isUploadLoading,
    isSuccess: isUploadSuccess,
  } = useMutateUploadFile({
    onError: (error) => console.error("Upload failed:", error),
  });

  const {
    mutate: generateCode,
    isPending: isGeneratingCode,
    isSuccess: isGenerateSuccess,
  } = useMutateGenerateCode({
    onSuccess: (data) => console.log("GPT response:", data),
    onError: (error) => console.error("Code generation failed:", error),
  });

  const handleDrop = useCallback(
    async (accepted: File[]) => {
      const uploaded = await Promise.all(
        accepted.map((file) => uploadFile(file))
      );
      setFiles((prev) => [...prev, ...uploaded]);
    },
    [uploadFile]
  );

  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.preview));
    };
  }, [files]);

  const removeImage = (uploadedUrl: string) => {
    setFiles((prev) => prev.filter((f) => f.uploadedUrl !== uploadedUrl));
  };

  const isLoading = isUploadLoading || isGeneratingCode;

  return (
    <Box>
      <DropArea onDrop={handleDrop} />
      <ImagePreview files={files} onRemove={removeImage} />
      <ActionButtons
        files={files}
        onGenerate={() => generateCode(files.map((f) => f.uploadedUrl))}
      />
      {isLoading && <LoadingIndicator />}
    </Box>
  );
}
