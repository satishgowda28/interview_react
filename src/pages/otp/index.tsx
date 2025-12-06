import {
  memo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

const ExcludeKeys = new Set([
  "Spacebar",
  "Space",
  "ArrowUp",
  "ArrowDown",
  "e",
  "E",
]);

const ioBoxLength = 6;
const OTPWrapper = () => {
  const [otpValue, setOtpValue] = useState("");
  const ioElemRef = useRef<HTMLInputElement[]>([]);
  const handleInput = (idx: number) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const elem = e.target;
      elem.value = elem.value.replace(/[^0-9]/g, "");
      if (elem.value && idx < ioBoxLength - 1) {
        ioElemRef.current[idx + 1].focus();
      }

      if (elem.value.length > 1) {
        if (isNaN(+elem.value)) {
          e.target.value = "";
          updateTheValue();
          return;
        }
        const allVals = elem.value.split("");
        for (let i = 0; i < allVals.length; i++) {
          if (i >= ioElemRef.current.length) break;
          ioElemRef.current[i + idx].value = allVals[i];
        }
        console.log(ioElemRef.current);
        console.log(idx + allVals.length);
        const toFocus = Math.min(
          ioElemRef.current.length - 1,
          idx + allVals.length
        );
        ioElemRef.current[toFocus].focus();
      }
      updateTheValue();
    };
  };

  const handleKeypress = (idx: number) => {
    return (e: KeyboardEvent) => {
      if (ExcludeKeys.has(e.key)) {
        e.preventDefault();
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        ioElemRef.current[idx].value = "";
        if (idx !== 0) {
          ioElemRef.current[idx - 1].focus();
        }
        updateTheValue();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        ioElemRef.current[idx < ioBoxLength - 1 ? idx + 1 : 0]?.focus();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        ioElemRef.current[idx === 0 ? ioBoxLength - 1 : idx - 1]?.focus();
      }
    };
  };

  const updateTheValue = () => {
    const otpValue = Array.from(ioElemRef.current || []).reduce((otp, elem) => {
      otp += elem.value.length ? elem.value : "";
      return otp;
    }, "");
    setOtpValue(otpValue);
  };

  return (
    <div className="w-dvw flex justify-center space-x-2">
      <h3>{otpValue}</h3>
      {Array(ioBoxLength)
        .fill(() => "")
        .map((_, i) => (
          <input
            type="number"
            pattern="\d*"
            step="0"
            min="0"
            max="9"
            autoComplete={"no"}
            className="border w-[40px] h-[40px] [appearance:textfield] rounded-lg text-center focus:shadow-inner  focus:shadow-white outline-none"
            key={i}
            onChange={handleInput(i)}
            onKeyDown={handleKeypress(i)}
            ref={(elem) => {
              if (elem) {
                ioElemRef.current[i] = elem;
              }
            }}
          />
        ))}
    </div>
  );
};

export default memo(OTPWrapper);
