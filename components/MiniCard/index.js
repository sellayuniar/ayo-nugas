import React from "react";

const MiniCard = ({ title, data }) => {
  return (
    <div className="row mb-2 mr-2 flex w-full flex-col items-center rounded-lg bg-white p-5 shadow-lg md:w-2/4 xl:w-64">
      <h3 className="text-md mb-3 font-semibold"> {title} </h3>
      <p className="text-3xl font-semibold text-[#EE3D3D]"> {data} </p>
    </div>
  );
};

export default MiniCard;
