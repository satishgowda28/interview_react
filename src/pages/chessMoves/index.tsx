import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { createBoard, directions, isValid } from "./_utils";

const ChessMoves = () => {
  const [boardArray, setBoardArray] = useState(() => createBoard());
  const elemRef = useRef<Array<Array<HTMLDivElement>>>([]);
  const moveToHightlight = useRef<Array<number[]>>([]);
  const picesMoves = useRef(directions.rook);
  const handleMouseEnter = (rowCol: [number, number]) => {
    return (e: MouseEvent<HTMLDivElement>) => {
      if (elemRef.current.length) {
        const [col, row] = rowCol;
        const elem = elemRef.current[row][col];
        elem.setAttribute("data-hover", "true");
        console.log([row, col]);
        const moves = getMoves(col, row);
        moveToHightlight.current = moves;
        for (let move of moves) {
          const [x, y] = move;
          const cell = elemRef.current[y][x];
          cell.setAttribute("data-hightlight", "true");
        }
      }
    };
  };
  const handleMousLeave = (rowCol: [number, number]) => {
    return (_e: MouseEvent<HTMLDivElement>) => {
      if (elemRef.current.length) {
        const [col, row] = rowCol;
        const elem = elemRef.current[row][col];
        elem.setAttribute("data-hover", "false");
        const moves = moveToHightlight.current;
        moveToHightlight.current = [];
        for (let move of moves) {
          const [x, y] = move;
          const cell = elemRef.current[y][x];
          cell.setAttribute("data-hightlight", "false");
        }
      }
    };
  };
  const getMoves = (...plPos: [number, number]) => {
    const directions = picesMoves.current;
    const [pX, pY] = plPos;
    let moves = [];
    for (let dir of directions) {
      const [dX, dY] = dir;
      let nX = pX + dX;
      let nY = pY - dY;
      console.log(dir, pX, pY, nX, nY);
      console.log(isValid(nX, nY));

      // moves.push([nY, currY]);
      while (isValid(nX, nY)) {
        moves.push([nX, nY]);
        nX += dX;
        nY -= dY;
      }
    }
    return moves;
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
            className="w-[40px] h-[40px] border data-[even=true]:bg-[#f0d9b5] data-[even=false]:bg-[#b58863] data-[hover=true]:bg-[#87cefa] data-[hover=true]:shadow-[inset_0_0_0_3px_#3b82f6] data-[hightlight=true]:bg-[#4682b4]"
            data-even={(i + j) % 2 === 0}
            data-hover={false}
            data-hightlight={false}
            onMouseEnter={handleMouseEnter([j, i])}
            onMouseLeave={handleMousLeave([j, i])}
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
