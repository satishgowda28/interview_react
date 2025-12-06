import type { FC, PropsWithChildren } from "react";

interface WElem {
  isRoot: boolean;
}
const WrapperElem: FC<PropsWithChildren<WElem>> = ({ isRoot, children }) => {
  return (
    <ul className={`${isRoot ? "" : "pl-4 mt-2"} space-y-3`}>{children}</ul>
  );
};

export default WrapperElem;
