import { useState, type ChangeEvent, type FormEvent } from "react";

const CommentInput = () => {
  const [text, setText] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(text);
  };
  return (
    <div className="w-full">
      <form className="space-x-4 flex items-center" onSubmit={handleSubmit}>
        <div className="flex-1">
          <input
            type="text"
            name=""
            id=""
            className="p-1.5 border rounded-4 w-full"
            value={text}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setText(e.target.value);
            }}
          />
        </div>
        <div>
          <button className="p-2 rounded border">Submit comment</button>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
