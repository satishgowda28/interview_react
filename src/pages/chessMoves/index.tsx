import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { createBoard } from "./_utils";

const ChessMoves = () => {
  const [boardArray, setBoardArray] = useState(() => createBoard());
  const elemRef = useRef<Array<Array<HTMLDivElement>>>([]);
  const handleMouseEnter = (rowCol: [number, number]) => {
    return (e: MouseEvent<HTMLDivElement>) => {
      if (elemRef.current.length) {
        const [row, col] = rowCol;
        const elem = elemRef.current[row][col];
        elem.setAttribute("data-hover", "true");
      }
    };
  };
  const handleMousLeave = (rowCol: [number, number]) => {
    return (_e: MouseEvent<HTMLDivElement>) => {
      if (elemRef.current.length) {
        const [row, col] = rowCol;
        const elem = elemRef.current[row][col];
        elem.setAttribute("data-hover", "false");
      }
    };
  };
  useEffect(() => {
    console.log(elemRef.current);
  }, []);
  return (
    <div
      className="grid grid-cols-[repeat(var(--width),40px)] grid-rows-[repeat(var(--width),40px)] border-2 border-black shadow-[0_0_10px_rgba(255,255,255,30%)]"
      style={{ "--width": boardArray.length } as CSSProperties}
    >
      {boardArray.map((row, i) =>
        row.map((_, j) => (
          <div
            key={`${i}_${j}`}
            className="w-[40px] h-[40px] border data-[even=true]:bg-[#f0d9b5] data-[even=false]:bg-[#b58863] data-[hover=true]:bg-[#87cefa] data-[hover=true]:shadow-[inset_0_0_0_3px_#3b82f6]"
            data-even={(i + j) % 2 === 0}
            data-hover={false}
            onMouseEnter={handleMouseEnter([i, j])}
            onMouseLeave={handleMousLeave([i, j])}
            ref={(elem) => {
              if (!elemRef.current[i]) {
                elemRef.current[i] = [];
              }
              elemRef.current[i][j] = elem!;
            }}
          />
        ))
      )}
    </div>
  );
};

export default ChessMoves;
