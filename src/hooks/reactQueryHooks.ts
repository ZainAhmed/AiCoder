import { useMutation, UseMutationOptions } from "@tanstack/react-query";

/* ---------- UPLOAD FILE ---------- */

export interface FileWithPreview {
  file: File;
  preview: string;
  uploadedUrl: string;
}

const uploadFile = async (file: File): Promise<FileWithPreview> => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: formData });

  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();

  return {
    file,
    preview: URL.createObjectURL(file),
    uploadedUrl: data.url,
  };
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
