import { useEffect, type MouseEvent as ReactMouseEvent } from "react";

enum CircleType {
  LEFT = "left",
  RIGHT = "right",
}

interface CircleInterface {
  id: CircleType;
  width: number;
  height: number;
}

const disableContextMenu = (e: MouseEvent) => {
  e.preventDefault();
};
const OverLappingCircles = () => {
  useEffect(() => {
    document.addEventListener("contextmenu", disableContextMenu);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  const handlMouseDown = (e: ReactMouseEvent) => {
    const { button } = e;
    const cicleType = button === 0 ? CircleType.LEFT : CircleType.RIGHT;
  };
  return (
    <div
      className="w-dvw h-dvh bg-white relative"
      onMouseDown={handlMouseDown}
    ></div>
  );
};

export default OverLappingCircles;
