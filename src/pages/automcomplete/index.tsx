import { useEffect, useState, type KeyboardEvent } from "react";
import useDebounce from "./_hooks/useDebounce";
import useServiceHook from "./_hooks/useServiceHook";
import type { RecepiesResponse } from "./types";

const AutoCompleteInput = () => {
  const [searchTxt, setSearchTxt] = useState("");
  const [ddOpen, setDDOpen] = useState(false);
  const [result, setResult] = useState<RecepiesResponse>([]);
  const { wrapperFunction } = useDebounce({ cb: logText, delay: 500 });
  const { data, refetch, isLoading, isFetching } = useServiceHook(searchTxt);
  const [selectedIdx, setSelectedIdx] = useState(-1);

  function logText(val: string) {
    if (val.length >= 3) {
      refetch({ cancelRefetch: true }).then((res) => {
        console.log("res", res.data);
      });
      console.log("searchTxt:", val);
    }
  }

  function handleKeyPress(e: KeyboardEvent) {
    if (result && result?.length >= 0) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((prev) => (prev <= 0 ? result.length - 1 : prev - 1));
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((prev) => (prev === result.length - 1 ? 0 : prev + 1));
      }

      if (e.key === "Enter") {
        e.preventDefault();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setDDOpen(false);
      }
    }
  }
  useEffect(() => {
    wrapperFunction(searchTxt);
    setSelectedIdx(-1);
  }, [searchTxt]);

  useEffect(() => {
    if (data?.length) {
      setResult(data);
    } else {
      setResult([]);
    }
  }, [data]);
  return (
    <div className="w-[400px]">
      <div className="relative border-white border rounded-3xl px-4 w-full rounded-bl-none rounded-br-none">
        <div className="space-x-1 border-b-white flex">
          <input
            type="text"
            className="focus:outline-0 flex-1 py-2"
            onChange={(e) => setSearchTxt(e.target.value)}
            onFocus={() => {
              setDDOpen(true);
            }}
            onKeyDown={handleKeyPress}
            value={searchTxt}
          />
          <button className="p-2 cursor-pointer">x</button>
        </div>

        {ddOpen && (isFetching || isLoading || (data && data?.length !== 0)) ? (
          <div className="absolute -left-[1px] top-full w-[calc(100%+2px)] px-4 border rounded-bl-3xl rounded-br-3xl py-4">
            {isLoading && <span>Searching...</span>}
            {data?.length && (
              <ul className="flex flex-col items-start space-y-2 ">
                {result?.map((obj, i: number) => (
                  <li
                    key={obj.id}
                    className={`flex space-x-2 items-center w-full border ${
                      i === selectedIdx ? "border-white" : "border-transparent"
                    }`}
                  >
                    <img
                      src={obj.image}
                      alt=""
                      className="w-[40px] h-[40px] object-cover"
                    />
                    <span>{obj.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AutoCompleteInput;
