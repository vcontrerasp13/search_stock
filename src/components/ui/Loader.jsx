import React from "react";
import "../ui/Loader.css";
export const Loader = () => {
  return (
    <div className="m-auto flex flex-col gap-2 justify-center items-center min-h-40">
      <div className="lds-roller ">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span>Cargando...</span>
    </div>
  );
};
