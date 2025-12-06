import type { FC } from "react";

interface BoxInterface {
  value: number | string;
  idx: string;
}

const Box: FC<BoxInterface> = ({ value, idx }) => {
  return (
    <div
      className={`border border-black ${
        value === 0
          ? "opacity-0 cursor-default pointer-events-none"
          : "opacity-100 cursor-pointer"
      } data-[active=true]:bg-green-400 transition duration-200`}
      data-id={idx}
      data-active={false}
    />
  );
};

export default Box;
