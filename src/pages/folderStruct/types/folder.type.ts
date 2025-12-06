export interface FolderInterface {
  name: string;
  type: "directory" | "file";
  children: FolderInterface[];
}
