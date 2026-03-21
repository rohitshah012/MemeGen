import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Text from "../components/text";
import { useRef } from "react";

import { toJpeg } from "html-to-image";

export default function Edit() {
  const [count, setCount] = useState(0);

  const [params] = useSearchParams();

  // console.log(params.get('url'));

  const Addtext = () => {
    setCount(count + 1);
  };

  const memeref = useRef();

  const handleSave = () => {
  if (!memeref.current) return;

  toJpeg(memeref.current, { quality: 1 })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "meme.jpeg";
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      console.log(err);
    });
};

  return (
    <div>
      <h1>Edit Your Meme Here</h1>

      <div ref={memeref} className="memeimg relative m-2 p-2 w-auto h-auto">
        <img
          src={params.get("url")}
          alt="meme img"
          className="w-75 h-100 object-cover rounded-lg"
        />

        {Array(count)
          .fill(0)
          .map((e, index) => (
            <Text key={index} />
          ))}
      </div>

      <button
        onClick={Addtext}
        className="bg-amber-300 px-4 m-2 rounded-2xl cursor-pointer"
      >
        Add text
      </button>

      <button
  onClick={handleSave}
  className="text-white bg-green-500 font-bold italic px-4 m-2 rounded-2xl cursor-pointer"
>
  Save
</button>
    </div>
  );
}
