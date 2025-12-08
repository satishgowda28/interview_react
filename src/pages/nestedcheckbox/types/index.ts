export type ParentChild = Record<number, number[]>;

export type CheckboxData = Record<
  number,
  {
    id: number;
    checked: boolean;
    indeterminate: boolean;
    label: string;
    parent: number | null;
  }
>;
