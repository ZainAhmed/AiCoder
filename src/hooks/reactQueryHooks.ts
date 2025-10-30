import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import imageCompression from "browser-image-compression";
/* ---------- UPLOAD FILE ---------- */

export interface FileWithPreview {
  compressedFile: File;
  preview: string;
  uploadedUrl: string;
}

const uploadFile = async (file: File): Promise<FileWithPreview> => {
  const compressedFile = await compressFile(file);
  const formData = new FormData();
  formData.append("file", compressedFile);
  const res = await fetch("/api/upload", { method: "POST", body: formData });

  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();

  return {
    compressedFile,
    preview: URL.createObjectURL(compressedFile),
    uploadedUrl: data.url,
  };
};
const compressFile = async (file: File): Promise<File> => {
  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    });

    console.log(
      `Original: ${file.name} ${(file.size / 1024 / 1024).toFixed(2)} MB`
    );
    console.log(
      `Compressed: ${compressedFile.name} ${(
        compressedFile.size /
        1024 /
        1024
      ).toFixed(2)} MB`
    );
    return compressedFile;
  } catch (error: Error) {
    console.log(error);
    throw error;
  }
};

export const useMutateUploadFile = (
  options?: UseMutationOptions<FileWithPreview, Error, File>
) => {
  return useMutation({
    mutationFn: uploadFile,
    ...options,
  });
};

/* ---------- GENERATE CODE ---------- */

interface GenerateResponse {
  output_text?: string;
}

const generateCode = async (imageUrls: string[]): Promise<GenerateResponse> => {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(imageUrls),
  });

  if (!res.ok) throw new Error("Failed to generate code");
  return res.json();
};

export const useMutateGenerateCode = (
  options?: UseMutationOptions<GenerateResponse, Error, string[]>
) => {
  return useMutation({
    mutationFn: generateCode,
    ...options,
  });
};
