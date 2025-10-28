"use client";
import React, { useCallback, useState, useEffect } from "react";
import { Box } from "@mui/material";
import DropArea from "./DropArea";
import ImagePreview from "./ImagePreview";
import ActionButtons from "./ActionButtons";
import { useMutateUploadFile, FileWithPreview } from "@/hooks/reactQueryHooks";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useRouter } from "next/navigation";
import { useImageStore } from "@/store/imageStore";
export default function ImageDropzone() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const setImageUrl = useImageStore((s) => s.setImageUrl);
  const router = useRouter();

  const { mutateAsync: uploadFile, isPending: isUploadLoading } =
    useMutateUploadFile({
      onError: (error) => console.error("Upload failed:", error),
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
    setImageUrl(files.map((file) => file.uploadedUrl));
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.preview));
    };
  }, [files]);

  const removeImage = (uploadedUrl: string) => {
    setFiles((prev) => prev.filter((f) => f.uploadedUrl !== uploadedUrl));
  };
  const handleGenerateCodePressed = () => {
    router.push("/editor");
  };

  return (
    <Box>
      <DropArea onDrop={handleDrop} />
      <ImagePreview files={files} onRemove={removeImage} />
      <ActionButtons
        files={files}
        onGenerate={() => handleGenerateCodePressed()}
      />
      {isUploadLoading && <LoadingIndicator />}
    </Box>
  );
}
