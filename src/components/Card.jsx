import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

 const Card = (props) => {

  const Navigate = useNavigate();
  return (
    <div className="flex justify-center">
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300  flex justify-between flex-col  ">
      
      {/* Image */}
      <img
        src={props.image || "https://via.placeholder.com/300x180"}
        alt="card"
        className="w-full h-180px object-cover m-10px p-2 rounded-3xl"
      />

      {/* Body */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">
          {props.title || "Card Title"}
        </h2>
{/* 
        <p className="text-gray-600 text-sm mt-2">
          {props.text || "Some quick example text..."}
        </p> */}

        <button className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={(e)=>{Navigate(`/edit/?url=${props.image}`)}}>
          {props.buttonText || "Edit Meme"}
        </button>
      </div>

    </div>
    </div>
  );
};

export default Card