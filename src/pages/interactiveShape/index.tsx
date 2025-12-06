import { useMemo, useRef, type MouseEvent } from "react";
import Box from "./_components/box";

const SHAPE = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

const InteractiveShape = () => {
  // const [cellSelected, setCellSelected] = useState<Set<string>>(new Set());
  const selectedCell = useRef(new Set());
  const inProcess = useRef<boolean>(false);
  const wrapperElem = useRef<HTMLDivElement | null>(null);

  const totalActiveCell = useMemo(() => {
    return SHAPE.reduce((rowTotal, row) => {
      const value = row.reduce((prev, cell) => {
        return prev + cell;
      }, 0);
      return rowTotal + value;
    }, 0);
  }, [SHAPE]);

  const startDeactivating = () => {
    const start = () => {
      if (selectedCell.current.size > 0) {
        const tempArr = [...selectedCell.current];
        const idx = tempArr.shift() || "";
        const elem = wrapperElem.current?.querySelector(`[data-id="${idx}"]`);
        elem?.setAttribute("data-active", "false");
        selectedCell.current.delete(idx);
        setTimeout(start, 500);
      } else {
        inProcess.current = false;
      }
    };
    setTimeout(start, 100);
  };

  const handleClick = (e: MouseEvent) => {
    const { target } = e;
    const element = target as HTMLDivElement;
    const idx = element.getAttribute("data-id");
    const active = element.getAttribute("data-active");
    if (inProcess.current) {
      return;
    }
    if (idx && active === "false") {
      element.setAttribute("data-active", "true");
      selectedCell.current.add(idx);

      if (selectedCell.current.size === totalActiveCell) {
        inProcess.current = true;
        startDeactivating();
      }
    }
  };

  return (
    <div
      className={`grid grid-cols-3 gap-2 w-[240px] h-[240px]`}
      onClick={handleClick}
      ref={wrapperElem}
    >
      {SHAPE.map((row, x) =>
        row.map((cell, y) => (
          <Box value={cell} idx={`${x}-${y}`} key={`${x}-${y}`} />
        ))
      )}
    </div>
  );
};

export default InteractiveShape;
