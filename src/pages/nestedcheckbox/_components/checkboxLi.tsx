import type { ChangeEvent, FC, PropsWithChildren } from "react";

interface CheckboxType {
  label: string;
  id: number;
  onChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}
const CheckboxLi: FC<PropsWithChildren<CheckboxType>> = ({
  label,
  id,
  children,
  onChangeEvent,
  checked,
}) => {
  return (
    <li className={`relative`}>
      <div className="flex space-x-2 bg-[#242424] relative z-10">
        <input
          type="checkbox"
          id={`${label}-${id}`}
          onChange={onChangeEvent}
          checked={checked}
        />
        <label htmlFor={`${label}-${id}`}>
          {id} - {label}
        </label>
      </div>
      {children && (
        <i className="absolute left-1.5 w-px top-0 bottom-0 bg-white/50 z-0" />
      )}
      {children}
    </li>
  );
};

export default CheckboxLi;
