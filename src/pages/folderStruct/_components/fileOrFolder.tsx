import { memo, useEffect, useRef, useState, type FC } from "react";
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa6";
import { IoCheckmarkSharp, IoClose, IoDocumentOutline } from "react-icons/io5";
import type { CrudOpArgsInterface } from "../types/crudOp.type";

interface IOBoxInterface {
  value: string;
  cancel: () => void;
  save: (v: string) => void;
}

const InputBox = ({ value, cancel, save }: IOBoxInterface) => {
  const [ioValue, setIoValue] = useState(() => value);
  const ioElem = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (ioElem.current) {
      ioElem.current.focus();
    }
  }, []);
  return (
    <div className="flex items-center">
      <input
        type="text"
        value={ioValue}
        onChange={(e) => setIoValue(e.target.value)}
        ref={ioElem}
        className="border rounded-sm px-2"
      />
      <div className="flex items-center space-x-1">
        <button
          onClick={() => {
            save(ioValue);
            cancel();
          }}
          className="cursor-pointer"
        >
          <IoCheckmarkSharp />
        </button>
        <button onClick={cancel} className="cursor-pointer">
          <IoClose />
        </button>
      </div>
    </div>
  );
};

const IOBoxElem = memo(InputBox);
interface FOFProps {
  text: string;
  isFolder: boolean;
  crudOp: (val: CrudOpArgsInterface) => void;
}
const FileORFolder: FC<React.PropsWithChildren<FOFProps>> = ({
  children,
  isFolder,
  text,
  crudOp,
}) => {
  const [showChildren, setShowChildren] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const handleDoubleClick = () => {
    setShowInput((prev) => !prev);
  };
  return (
    <li>
      <div className="flex items-center">
        {isFolder ? (
          <button
            className="w-5 h-5 flex justify-center items-center mr-2 cursor-pointer"
            onClick={() => setShowChildren((prev) => !prev)}
          >
            {showChildren ? <FaRegFolderOpen /> : <FaRegFolder />}
          </button>
        ) : (
          <IoDocumentOutline className="mr-1" />
        )}
        {!showInput ? (
          <span
            onDoubleClick={handleDoubleClick}
            className="cursor-pointer select-none"
          >
            {text}
          </span>
        ) : (
          <IOBoxElem
            value={text}
            cancel={handleDoubleClick}
            save={(ffName: string) =>
              crudOp({ type: "update", value: { name: ffName } })
            }
          />
        )}
        {isFolder}
      </div>
      {showChildren && <>{children}</>}
    </li>
  );
};

export default FileORFolder;
