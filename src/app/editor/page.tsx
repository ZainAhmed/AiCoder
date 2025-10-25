"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import FileExplorer from "@/components/Editor/FileExplorer";
import { FileSystemFolder, FileSystemNode } from "@/utils/types";
import { fileSystem } from "@/app/filesystem";
const CodeEditor = dynamic(() => import("@/components/Editor/CodeEditor"), {
  ssr: false,
});

function getNested(
  fs: FileSystemFolder,
  path: string
): FileSystemNode | undefined {
  const parts = path.split("/").filter(Boolean);
  let ref: FileSystemNode = fs;

  for (const part of parts) {
    if (typeof ref === "string") return undefined; // reached a file, no deeper
    ref = ref[part];
    if (!ref) return undefined;
  }

  return ref;
}

function setNested(fs: FileSystemFolder, path: string, value: string): void {
  const parts = path.split("/").filter(Boolean);
  const last = parts.pop()!;
  let ref: FileSystemNode = fs;

  for (const part of parts) {
    if (typeof ref === "string") throw new Error("Cannot set inside a file");
    if (!ref[part]) ref[part] = {}; // create folder if missing
    ref = ref[part];
  }

  if (typeof ref === "string") throw new Error("Invalid target path");
  ref[last] = value;
}

export default function EditorPage() {
  const [files, setFiles] = useState<FileSystemFolder>(fileSystem);

  const [currentFile, setCurrentFile] = useState("home/index.js");
  const [code, setCode] = useState(getNested(files, currentFile));

  const handleFileSelect = (path: string) => {
    const newCode = getNested(files, path);
    setCurrentFile(path);
    setCode(newCode);
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
    setFiles((prev) => {
      const newFiles = { ...prev };
      setNested(newFiles, currentFile, value);
      return newFiles;
    });
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <FileExplorer files={files} onFileSelect={handleFileSelect} />
      <div style={{ flex: 1 }}>
        <CodeEditor
          path={currentFile}
          code={code as string}
          onChange={handleCodeChange}
        />
      </div>
    </div>
  );
}
