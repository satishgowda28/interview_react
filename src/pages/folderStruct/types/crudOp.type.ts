type CrudType = "update" | "delete" | "new";
type NewType = "directory" | "file";

export interface CrudOpArgsInterface {
  type: CrudType;
  value: {
    name: string;
    newType?: NewType;
  } | null;
}
