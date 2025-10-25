"use client";

import { useState } from "react";
import { FileSystemFolder } from "@/utils/types";

interface FileExplorerProps {
  files: FileSystemFolder;
  onFileSelect: (path: string) => void;
}

export default function FileExplorer({
  files,
  onFileSelect,
}: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );

  const toggleFolder = (path: string) => {
    const newSet = new Set(expandedFolders);
    if (newSet.has(path)) {
      newSet.delete(path);
    } else {
      newSet.add(path);
    }
    setExpandedFolders(newSet);
  };

  const renderTree = (obj: FileSystemFolder, parentPath = "") => {
    return Object.entries(obj).map(([key, value]) => {
      const path = parentPath ? `${parentPath}/${key}` : key;

      if (typeof value === "string") {
        return (
          <div
            key={path}
            style={{
              paddingLeft: `${parentPath.split("/").length * 20}px`,
              cursor: "pointer",
            }}
            onClick={() => onFileSelect(path)}
          >
            📄 {key}
          </div>
        );
      } else {
        return (
          <div
            key={path}
            style={{ paddingLeft: `${parentPath.split("/").length * 20}px` }}
          >
            <div
              style={{ cursor: "pointer" }}
              onClick={() => toggleFolder(path)}
            >
              {expandedFolders.has(path) ? "📂" : "📁"} {key}
            </div>
            {expandedFolders.has(path) && renderTree(value, path)}
          </div>
        );
      }
    });
  };

  return (
    <div
      style={{ width: "250px", borderRight: "1px solid gray", padding: "10px" }}
    >
      {renderTree(files)}
    </div>
  );
}
