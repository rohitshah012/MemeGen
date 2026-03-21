import React, { useRef, useState } from "react";
import Draggable from "react-draggable";

const Text = () => {
  const nodeRef = useRef(null);

  const [value, setValue] = useState("Double Click to Edit");
  const [edit, setEdit] = useState(false);

  return (
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef} className="absolute cursor-move">
        {edit ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setEdit(false)}
            autoFocus
            className="bg-transparent text-white outline-none text-4xl font-bold"
          />
        ) : (
          <h1
            onDoubleClick={() => setEdit(true)}
            className="text-white drop-shadow-[0_0_0.3rem_#000] italic font-bold text-4xl"
          >
            {value}
          </h1>
        )}
      </div>
    </Draggable>
  );
};

export default Text;
