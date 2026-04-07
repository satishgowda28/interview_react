# InteractiveShape — Code Review

## Strengths

- **Event delegation** (`index.tsx:62`): Single `onClick` on the wrapper div instead of attaching handlers to each cell. Efficient and clean.
- **Refs for non-render state** (`index.tsx:12-14`): Using `useRef` for `selectedCell` and `inProcess` avoids unnecessary re-renders during interactions. Correct choice here.
- **`SHAPE` defined outside the component** (`index.tsx:4`): Prevents object recreation on each render.
- **`pointer-events-none` on inactive cells** (`box.tsx:13`): Cleanly prevents clicks on `value === 0` cells without needing conditional logic in the handler.
- **Tailwind data-attribute styling** (`box.tsx:15`): `data-[active=true]:bg-green-400` is a clean pattern that avoids conditional class logic.

---

## Issues & Improvements

### 1. `useMemo` is unnecessary here (`index.tsx:16-24`)

`SHAPE` is a module-level constant — it never changes. Wrapping the calculation in `useMemo` adds noise and ESLint would warn that `SHAPE` is not a reactive dependency. Move the computation outside the component entirely:

```ts
// outside the component
const TOTAL_ACTIVE_CELLS = SHAPE.flat().reduce((sum, cell) => sum + cell, 0);
```

Remove the `useMemo` import as well.

---

### 2. No cleanup for recursive `setTimeout` (`index.tsx:25-39`)

If the component unmounts while `startDeactivating` is running, the timeouts continue firing and will try to access stale refs — potentially causing memory leaks or console warnings. Store the timeout ID and clean it up:

```ts
const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

// inside startDeactivating:
timeoutRef.current = setTimeout(start, 500);

// cleanup:
useEffect(() => {
  return () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
}, []);
```

---

### 3. Direct DOM mutation bypasses React (`index.tsx:51`, `index.tsx:32`)

Using `setAttribute("data-active", ...)` directly on DOM nodes works, but it's fragile — React is unaware of these changes. If anything causes a re-render (e.g., a parent update), React could restore the original DOM state, resetting your visual indicators.

**Preferred approach:** Lift selected cell IDs into `useState<Set<string>>` and derive the active state in `Box` via a prop. You already have the commented-out `useState` on line 11 — consider finishing that approach:

```tsx
const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
// pass isActive={selectedCells.has(idx)} to Box
```

This makes state explicit and predictable, at the cost of re-renders (which are acceptable for a 9-cell grid).

---

### 4. `value` prop type is too broad (`box.tsx:4`)

`value: number | string` but only `0` or `1` are ever passed. Tighten the type:

```ts
value: 0 | 1;
```

This makes the contract explicit and enables exhaustive checks.

---

### 5. Inefficient array copy in `startDeactivating` (`index.tsx:28-29`)

```ts
const tempArr = [...selectedCell.current];
const idx = tempArr.shift() || "";
```

This spreads the entire Set into an array just to read the first element. Use the iterator directly:

```ts
const idx = selectedCell.current.values().next().value as string;
```

---

### 6. `idx` fallback `|| ""` is misleading (`index.tsx:29`)

If `tempArr.shift()` returns `undefined` (empty set), the fallback `""` means you'd call `selectedCell.current.delete("")` — a silent no-op. Since you already guard against empty set with the `if (selectedCell.current.size > 0)` check, the fallback is never hit. Use a non-null assertion instead to make the intent clear:

```ts
const idx = selectedCell.current.values().next().value as string;
```

---

## Summary

| Area | Rating |
|---|---|
| Event handling | Strong |
| Ref usage for perf | Good intent, but risky with direct DOM mutation |
| Cleanup / unmount safety | Missing |
| Type accuracy | Minor gaps |
| React idioms | Needs improvement (prefer state over DOM mutation) |

The biggest skill gap here is the **ref + direct DOM mutation pattern** — it's understandable as a performance optimization, but it trades React's reliability guarantees for micro-optimization that isn't needed at this scale. The `useState` approach (already commented out) is the right direction.
