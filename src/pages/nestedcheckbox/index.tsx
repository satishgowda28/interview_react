import { useEffect, useState, type FC, type PropsWithChildren } from "react";
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
}

const CheckboxWrapperComp: FC<PropsWithChildren<WrapperComp>> = ({
  rootIds,
  parentChildRel,
  allData,
  isRoot,
  refId,
}) => {
  return (
    <WrapperElem isRoot={isRoot}>
      <CheckboxLi id={refId} label={allData?.[refId].label || ""}>
        {parentChildRel?.[refId]?.map((idx) => (
          <CheckboxWrapperComp
            key={`${allData?.[refId].label}_${idx}`}
            rootIds={rootIds}
            parentChildRel={parentChildRel}
            allData={allData}
            refId={idx}
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
    console.log({ rootIds, parentChild, flatData });
    setRootIds(rootIds);
    setParentChildRel(parentChild);
    setAllData(flatData);
  }, []);
  return (
    <div>
      {rootIds?.map((idx) => (
        <CheckboxWrapperComp
          key={idx}
          rootIds={rootIds}
          parentChildRel={parentChildRel}
          allData={allData}
          refId={idx}
          isRoot
        />
      ))}
    </div>
  );
};

export default NestedCheckbox;
