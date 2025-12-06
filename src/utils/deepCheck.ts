export const deepCheckDeps = <T extends readonly unknown[]>(
  prev: T,
  curr: T
) => {
  if (!prev || !curr || prev.length !== curr.length) {
    return false;
  }
  for (let i = 0; i < prev.length; i++) {
    if (prev[i] !== curr[i]) {
      return false;
    }
  }
  return true;
};
