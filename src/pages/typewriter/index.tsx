import clsx from "clsx";
import { useState, type ChangeEvent } from "react";
import { TEXT } from "./_const";
import { TEXT_STATUS } from "./_types";

const initalText = TEXT.split("").map((char) => ({
  char: char,
  status: TEXT_STATUS.UNTYPED,
}));
console.log(initalText);
const Typewriter = () => {
  const [textArray, setTextArray] = useState(() => initalText);
  const [inputValue, setInputValue] = useState("");

  const onTextType = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let mistakeFound = false;
    const updateTextArray = textArray.map(({ char }, i) => {
      let status = TEXT_STATUS.UNTYPED;
      if (i < value.length) {
        if (mistakeFound) {
          status = TEXT_STATUS.IN_CORRECT;
        } else if (value[i] === char) {
          status = TEXT_STATUS.CORRECT;
          mistakeFound = false;
        } else {
          status = TEXT_STATUS.IN_CORRECT;
          mistakeFound = true;
        }
      }
      return {
        char,
        status,
      };
    });
    setTextArray(updateTextArray);
    setInputValue(value);
  };
  return (
    <div className="w-full max-w-[700px] mx-auto flex flex-col items-start">
      <div className="py-10">Timer</div>
      <div className="py-10 flex flex-wrap select-none">
        {textArray.map(({ char, status }, i) =>
          char !== " " ? (
            <span
              key={`${char}_${i}`}
              className={clsx({
                "text-gray-500": status === TEXT_STATUS.UNTYPED,
                "text-green-500": status === TEXT_STATUS.CORRECT,
                "text-red-500": status === TEXT_STATUS.IN_CORRECT,
              })}
              data-status={status}
            >
              {char}
            </span>
          ) : (
            <>&nbsp;</>
          )
        )}
      </div>
      <input
        type="text"
        className="border"
        onChange={onTextType}
        value={inputValue}
      />
    </div>
  );
};

export default Typewriter;
