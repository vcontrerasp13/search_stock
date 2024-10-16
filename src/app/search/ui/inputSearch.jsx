"use client";
import React, { useEffect, useRef } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

const InputSearch = ({ setItemCode, itemCode, handleSearch }) => {
  const emailInput = useRef(null);
  useEffect(() => {
    if (emailInput.current) {
      emailInput.current.focus();
    }
  }, []);

  return (
    <div className="flex items-center w-full join ">
      <input
        type="text"
        className="input input-bordered join-item w-full"
        placeholder="Ingresar Cod..."
        value={itemCode}
        onChange={(e) => setItemCode(e.target.value)}
        autoFocus
        ref={emailInput}
      />
      <button
        onClick={handleSearch}
        className="btn join-item btn-success text-white rounded-r-lg"
      >
        <HiMagnifyingGlass width={50} className="text-3xl" />
      </button>
    </div>
  );
};

export default InputSearch;
