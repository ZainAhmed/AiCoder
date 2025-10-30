import { FileSystemFolder, FileSystemNode } from "@/utils/types";

export const getNested = (
  fs: FileSystemFolder,
  path: string
): FileSystemNode | undefined => {
  const parts = path.split("/").filter(Boolean);
  let ref: FileSystemNode = fs;

  for (const part of parts) {
    if (typeof ref === "string") return undefined; // reached a file, no deeper
    ref = ref[part];
    if (!ref) return undefined;
  }

  return ref;
};

export const setNested = (
  fs: FileSystemFolder,
  path: string,
  value: string
): void => {
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
};
export const createNewFolder = (root: FileSystemFolder, folderName: string) => {
  root[folderName] = {};
};

export const createNewFile = (
  root: FileSystemFolder,
  fileName: string,
  data: string = ""
) => {
  root[fileName] = data;
};

const findMainComponent = () => {};
