"use client";
import Link from "next/link";
import React from "react";
import { HiArrowSmallLeft } from "react-icons/hi2";

export const HeaderSearch = () => {
  return (
    <div className="flex gap-2 p-4">
      <Link href="/">
        <HiArrowSmallLeft size={30} className="text-center text-orange-400" />
      </Link>
      <h2 className="text-3xl mb-3">Lista de Productos</h2>
    </div>
  );
};
