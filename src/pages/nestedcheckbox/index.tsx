import {
  useEffect,
  useState,
  type ChangeEvent,
  type FC,
  type PropsWithChildren,
} from "react";
import CheckboxLi from "./_components/checkboxLi";
import WrapperElem from "./_components/wrapper";
import checkboxData from "./_data/index.json";
import { runNormalize, type Node } from "./_utils";
import type { CheckboxData, ParentChild } from "./types";

interface WrapperComp {
  rootIds: number[];
  parentChildRel?: ParentChild;
  allData?: CheckboxData;
  isRoot: boolean;
  refId: number;
  ioChangeEvent: (idx: number) => (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxWrapperComp: FC<PropsWithChildren<WrapperComp>> = ({
  rootIds,
  parentChildRel,
  allData,
  isRoot,
  refId,
  ioChangeEvent,
}) => {
  return (
    <WrapperElem isRoot={isRoot}>
      <CheckboxLi
        id={refId}
        label={allData?.[refId].label || ""}
        onChangeEvent={ioChangeEvent(refId)}
        checked={allData?.[refId].checked || false}
      >
        {parentChildRel?.[refId]?.map((idx) => (
          <CheckboxWrapperComp
            key={`${allData?.[refId].label}_${idx}`}
            rootIds={rootIds}
            parentChildRel={parentChildRel}
            allData={allData}
            refId={idx}
            ioChangeEvent={ioChangeEvent}
            isRoot={false}
          />
        ))}
      </CheckboxLi>
    </WrapperElem>
  );
};

const NestedCheckbox = () => {
  const [rootIds, setRootIds] = useState<number[]>([]);
  const [parentChildRel, setParentChildRel] = useState<ParentChild>({});
  const [allData, setAllData] = useState<CheckboxData>({});
  useEffect(() => {
    const { rootIds, parentChild, flatData } = runNormalize(
      checkboxData as Node[]
    );
    setRootIds(rootIds);
    setParentChildRel(parentChild);
    setAllData(flatData);
  }, []);
  const handleChekboxChange = (idx: number) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      let tempAllData = { ...allData };
      tempAllData[idx].checked = e.target.checked;
      const modByChildren = checkChildren(idx, e.target.checked, tempAllData);
      const modByParent = checkParent(idx, e.target.checked, {
        ...tempAllData,
        ...modByChildren,
      });
      tempAllData = { ...tempAllData, ...modByChildren, ...modByParent };
      setAllData((prev) => ({ ...prev, ...tempAllData }));
    };
  };
  const checkChildren = (
    idx: number,
    value: boolean,
    tempObj: CheckboxData
  ) => {
    const childrens = parentChildRel[idx];
    if (childrens) {
      for (let childId of childrens) {
        tempObj[childId].checked = value;
        if (parentChildRel[childId]) {
          tempObj = {
            ...tempObj,
            ...checkChildren(childId, value, { ...tempObj }),
          };
        }
      }
    } else {
      return tempObj;
    }
    return tempObj;
  };
  const checkParent = (idx: number, value: boolean, tempObj: CheckboxData) => {
    const parentId = tempObj[idx].parent;
    if (parentId === null) {
      return tempObj;
    }
    if (!value) {
      tempObj[parentId].checked = value;
      return checkParent(parentId, value, { ...tempObj });
    }
    const childrens = parentChildRel[parentId];
    if (childrens) {
      let allChecked = true;
      for (let child of childrens) {
        if (child !== idx) {
          if (!tempObj[child].checked) {
            allChecked = false;
            break;
          }
        }
      }
      if (allChecked) {
        tempObj[parentId].checked = value;
        return checkParent(parentId, value, { ...tempObj });
      }
      return tempObj;
    }
  };
  return (
    <div>
      {rootIds?.map((idx) => (
        <CheckboxWrapperComp
          key={idx}
          rootIds={rootIds}
          parentChildRel={parentChildRel}
          allData={allData}
          refId={idx}
          ioChangeEvent={handleChekboxChange}
          isRoot
        />
      ))}
    </div>
  );
};

export default NestedCheckbox;
