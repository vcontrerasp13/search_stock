import React from "react";
import { HiOutlineMapPin } from "react-icons/hi2";

export const EstablecimientoItem = ({ e }) => {
  return (
    <div className="btn btn-block no-animation text-left">
      <HiOutlineMapPin />
      {e.nombre} - {e.cantidad}
    </div>
  );
};
