export const generatePages = (currPage: number, totalPages: number) => {
  let pages = [];
  const threshold = 10;
  pages.push(1);

  let start = 2;
  let end = threshold;

  if (currPage > threshold) {
    pages.push(-1);
    start = currPage - 5;
    end = Math.min(currPage + 4, totalPages - 1);
  }

  for (let i = start; i < end + 1; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) {
    pages.push(-2);
  }

  pages.push(totalPages);

  return pages;
};
