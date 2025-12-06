import { useState } from "react";
import folderStruct from "../../data/folderStructre.json";
import FileORFolder from "./_components/fileOrFolder";
import Wrapper from "./_components/wrapper";
import type { CrudOpArgsInterface } from "./types/crudOp.type";
import type { FolderInterface } from "./types/folder.type";

interface WrpElemInterface {
  isRoot: boolean;
  parent: Array<number>;
  objCrud: (val: CrudOpArgsInterface & { path: number[] }) => void;
}

const WrapperElement = ({
  name,
  type,
  children,
  isRoot,
  parent,
  objCrud: handleObjCrud,
}: FolderInterface & WrpElemInterface) => {
  return (
    <Wrapper isParent={isRoot}>
      <FileORFolder
        text={name}
        isFolder={type === "directory"}
        crudOp={(val) => {
          handleObjCrud({ ...val, path: parent });
        }}
      >
        {children?.length
          ? children.map((fObj, i) => (
              <>
                <WrapperElement
                  {...fObj}
                  isRoot={false}
                  key={`${name}-${fObj.name}-${i}`}
                  parent={[...parent, i]}
                  objCrud={handleObjCrud}
                />
              </>
            ))
          : null}
      </FileORFolder>
    </Wrapper>
  );
};

const FolderStruct = () => {
  const [fStructure, mutateFStructure] = useState<FolderInterface[]>(() => {
    return [folderStruct] as FolderInterface[];
  });
  const handleObjCrud = ({
    path,
    ...crudMeta
  }: CrudOpArgsInterface & { path: number[] }) => {
    mutateFStructure((prev) => {
      path.reduce((prevArr, currId, id, arr) => {
        if (id === arr.length - 1) {
          prevArr[currId].name = crudMeta.value?.name ?? "";
          return prevArr;
        } else {
          return prevArr[currId]?.children;
        }
      }, prev as FolderInterface[]);
      return [...prev];
    });
  };
  return (
    <div className="text-left border border-amber-300 px-2">
      {fStructure.map((fObj, i) => (
        <>
          <WrapperElement
            {...fObj}
            isRoot
            key={`${fObj.name}-${i}`}
            parent={[i]}
            objCrud={handleObjCrud}
          />
        </>
      ))}
    </div>
  );
};

export default FolderStruct;
