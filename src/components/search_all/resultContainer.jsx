"use client";
import Image from "next/image";

import Card from "@/app/search/ui/Card";
import box_empty from "/public/images/image1.svg"

export const ResultContainer = ({ product, message }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {product.length > 0
        ? (product.map((p, i) => <Card key={i} data={p} />))
        : (
          <div className="col-span-2 items-center ">
            <p className=" text-center  text-orange-400 ">{message}</p>
            <Image
              src={box_empty}
              width={500}
              height={500}
              alt="imag-search"
              className=" h-62 mt-10 m-auto pointer-events-none opacity-30"
            />

          </div>
        )}
    </div>
  );
};
