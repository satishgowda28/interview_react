const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;
export const createBoard = () => {
  return Array.from(Array(BOARD_HEIGHT), () =>
    Array(BOARD_WIDTH).fill([0, "clear"])
  );
};
