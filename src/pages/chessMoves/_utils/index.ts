const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;
export const createBoard = () => {
  return Array.from(Array(BOARD_HEIGHT), () =>
    Array(BOARD_WIDTH).fill([0, "clear"])
  );
};

export const isValid = (...cords: [number, number]): boolean => {
  const [x, y] = cords;
  return x >= 0 && x <= BOARD_WIDTH - 1 && y >= 0 && y <= BOARD_HEIGHT - 1;
};

export const directions = {
  bishop: [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ],
  rook: [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ],
  queen: [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ],
  knight: [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ],
  king: [
    [1, 1],
    [1, 0],
    [1, -1],
    [0, 1],
    [0, -1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
  ],
};
