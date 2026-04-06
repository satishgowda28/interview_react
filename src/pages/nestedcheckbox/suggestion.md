# Nested Checkbox — Code Review & Suggestions

## Strengths

- **Good normalization strategy** — converting the tree to flat maps (`flatData`, `parentChild`) before rendering is the right approach. Makes state updates O(1) lookups.
- **Clean type definitions** in `types/index.ts` — `CheckboxData` and `ParentChild` are well-structured.
- **Recursive rendering** via `CheckboxWrapperComp` is elegant and correct.
- **Component decomposition** is reasonable — `CheckboxLi`, `WrapperElem` are small, focused components.

---

## Issues & Improvements

### 1. Bug — `checkParent` can return `undefined`
**File:** `index.tsx:101-126`

If `parentId !== null`, `value` is `true`, but `parentChildRel[parentId]` is falsy, the function falls off with no `return`, silently returning `undefined`. The caller spreads the result, losing state updates.

```ts
// Fix: add a fallback return at the end
if (childrens) { ... }
return tempObj; // add this line
```

---

### 2. Bug — `parentId || null` should be `parentId ?? null`
**File:** `_utils/index.ts:22`

If any node has `id: 0`, `parentId || null` treats `0` as falsy and incorrectly sets `parent: null`.

```ts
// Before
parent: parentId || null,

// After
parent: parentId ?? null,
```

---

### 3. State Mutation — Avoid mutating nested objects
**File:** `index.tsx:69, 107`

`tempObj[idx].checked = value` mutates nested objects that are still shared references from `allData`. Spreading the outer object (`{ ...allData }`) does not deep-clone the inner objects.

```ts
// Before
tempAllData[idx].checked = e.target.checked;

// After
tempAllData[idx] = { ...tempAllData[idx], checked: e.target.checked };
```

---

### 4. Unnecessary `useEffect` for static data
**File:** `index.tsx:59-66`

`checkboxData` is a static JSON import — running `runNormalize` inside `useEffect` causes an extra render (empty state on mount, then populated). Use a lazy initializer in `useState` instead:

```tsx
// Before
const [rootIds, setRootIds] = useState<number[]>([]);
const [parentChildRel, setParentChildRel] = useState<ParentChild>({});
const [allData, setAllData] = useState<CheckboxData>({});
useEffect(() => {
  const { rootIds, parentChild, flatData } = runNormalize(checkboxData as Node[]);
  setRootIds(rootIds);
  setParentChildRel(parentChild);
  setAllData(flatData);
}, []);

// After
const [{ rootIds, parentChildRel, allData }, setState] = useState(() => {
  const { rootIds, parentChild, flatData } = runNormalize(checkboxData as Node[]);
  return { rootIds, parentChildRel: parentChild, allData: flatData };
});
```

---

### 5. Missing `useCallback` on `handleChekboxChange`
**File:** `index.tsx:67`

This function is recreated on every render and passed as a prop deep into the recursive tree, causing unnecessary re-renders of all child components. Wrap with `useCallback`:

```tsx
const handleChekboxChange = useCallback((idx: number) => {
  return (e: ChangeEvent<HTMLInputElement>) => { ... };
}, [allData, parentChildRel]);
```

---

### 6. Dead prop — `rootIds` never used
**File:** `index.tsx:15, 130`

`CheckboxWrapperComp` accepts `rootIds` as a prop but never uses it anywhere in the component or its children. Remove it from the interface and all call sites.

---

### 7. `indeterminate` state declared but never implemented
**File:** `types/index.ts:7`, `index.tsx:113`

The `indeterminate` field exists in the type and there's even a commented-out line `// let anyIndetmined = false;`. The visual indeterminate state (half-checked parent when only some children are checked) is important UX for nested checkboxes. To implement it, use a `ref` on the `<input>`:

```tsx
// In CheckboxLi
const inputRef = useRef<HTMLInputElement>(null);
useEffect(() => {
  if (inputRef.current) {
    inputRef.current.indeterminate = indeterminate;
  }
}, [indeterminate]);

<input ref={inputRef} type="checkbox" ... />
```

---

### 8. Dead file — `wrapperComponent.tsx`
**File:** `_components/wrapperComponent.tsx`

This file only contains `export default CheckboxWrapperComp;` but `CheckboxWrapperComp` is defined in `index.tsx`. It either does nothing useful or could cause a reference error. Safe to delete.

---

### 9. Minor — Redundant spread in `setAllData`
**File:** `index.tsx:77`

Since `tempAllData` already contains all prior data merged in, spreading `prev` is redundant.

```ts
// Before
setAllData((prev) => ({ ...prev, ...tempAllData }));

// After
setAllData(tempAllData);
```

---

## Summary

| Area | Rating |
|---|---|
| Data normalization | Good |
| State update correctness | Needs work (mutation, undefined return) |
| Performance | Needs `useCallback` |
| Feature completeness | `indeterminate` not implemented |
| Code cleanliness | Minor dead code |
