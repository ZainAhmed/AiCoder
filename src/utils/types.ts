export type FileSystemNode = string | FileSystemFolder;
export interface FileSystemFolder {
  [name: string]: FileSystemNode;
}
