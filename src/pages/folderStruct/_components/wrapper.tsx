import type React from "react";
import type { FC } from "react";

interface WrapperProps {
  isParent?: boolean;
}

const Wrapper: FC<React.PropsWithChildren<WrapperProps>> = ({
  children,
  isParent,
}) => {
  return (
    <ul className={`${isParent ? "" : "pl-4 mt-4"} space-y-3`}>{children}</ul>
  );
};

export default Wrapper;
