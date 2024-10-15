"use client";
import React, { useState } from "react";
// import { getProduct } from "@/api/product";
import { productStore } from "@/store/productStore";
import { HiMagnifyingGlass } from "react-icons/hi2";

const InputSearch = ({ setItemCode, itemCode, handleSearch }) => {
  const setProduct = productStore((state) => state.setProduct);
  const product = productStore((state) => state.product);

  return (
    <div className="flex items-center w-full ">
      <input
        type="text"
        className="text-xl h-10 w-full border rounded-md p-1 "
        placeholder="Ingresar Cod..."
        value={itemCode}
        onChange={(e) => setItemCode(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 p-2 text-white rounded-xl"
      >
        <HiMagnifyingGlass width={50} className="text-3xl" />
      </button>
    </div>
  );
};

export default InputSearch;
