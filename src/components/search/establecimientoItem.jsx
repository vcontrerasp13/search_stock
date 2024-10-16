import React from "react";
import { HiOutlineMapPin } from "react-icons/hi2";

export const EstablecimientoItem = ({ name }) => {
  return (
    <div className="btn btn-block no-animation text-left">
      <HiOutlineMapPin />
      {name}
    </div>
  );
};
