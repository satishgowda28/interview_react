export type ParentChild = Record<number, number[]>;

export type CheckboxData = Record<
  number,
  { id: number; checked: boolean; label: string; parent: number | null }
>;
