"use client";
import Card from "@/app/search/ui/Card";

export const ResultContainer = ({ product, message }) => {
  return (
    <div className="grid grid-cols-2 ">
      {product.length > 0 ? (
        product.map((e, i) => <Card key={i} data={e} />)
      ) : (
        <span className="col-span-2 text-slate-500">{message}</span>
      )}
    </div>
  );
};
