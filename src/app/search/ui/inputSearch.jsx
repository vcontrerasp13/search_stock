"use client";
import React, { useState } from "react";
// import { getProduct } from "@/api/product";
import { productStore } from "@/store/productStore";
import { HiMagnifyingGlass } from "react-icons/hi2";

const InputSearch = ({ setItemCode, itemCode, handleSearch }) => {
  const setProduct = productStore((state) => state.setProduct);
  const product = productStore((state) => state.product);

  return (
    <div className="flex items-center w-full join ">
      <input
        type="text"
        className="input input-bordered join-item w-full"
        placeholder="Ingresar Cod..."
        value={itemCode}
        onChange={(e) => setItemCode(e.target.value)}
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
