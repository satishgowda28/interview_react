import type checkboxData from "../_data/index.json";
import type { CheckboxData, ParentChild } from "../types";

export type Node = (typeof checkboxData)[number] & { children?: Node[] };

export function runNormalize(data: Node[]) {
  let rootIds: number[] = [];
  let parentChild: ParentChild = {};
  let flatData: CheckboxData = {};

  function normalizeData(initObj: Node[], isRoot: boolean, parentId?: number) {
    for (let obj of initObj) {
      if (isRoot) {
        rootIds.push(obj.id);
      }
      flatData[obj.id] = {
        id: obj.id,
        checked: false,
        label: obj.label,
        parent: parentId || null,
      };
      if (obj.children && obj.children.length > 0) {
        parentChild[obj.id] = obj.children.map((c) => c.id);
        normalizeData(obj.children, false, obj.id);
      }
    }
  }

  normalizeData(data, true);
  return { rootIds, parentChild, flatData };
}
