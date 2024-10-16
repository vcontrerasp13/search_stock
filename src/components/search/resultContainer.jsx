"use client";
import Card from "@/app/search/ui/Card";
import { establecimientoStore } from "@/store/establecimientoStore";
import { EstablecimientoItem } from "./establecimientoItem";
import { useEffect, useState } from "react";
import { productStore } from "@/store/productStore";
import { userStore } from "@/store/userStore";
import { ordernarEstablecimientosDistancia } from "../../../utils/helper";

export const ResultContainer = ({ product, message, itemCode = "" }) => {
  const establecimientos = establecimientoStore(
    (state) => state.establecimientos
  );
  const userdata = userStore((state) => state.user);
  // console.log(userdata);

  console.log(product.length); //0

  const setProduct = productStore((state) => state.setProduct);
  const dataWithStock = productStore((state) => state.product);

  useEffect(() => {
    setProduct(itemCode);
  }, []);

  // console.log(productsAll);

  const origen = establecimientos.find((e) => e.id == userdata.cod_establ);
  // const origen = establecimientos.find((e) => e.id == "ALM109");
  const establec_ordenados = ordernarEstablecimientosDistancia(
    establecimientos,
    origen
  );
  console.log(establec_ordenados);
  console.log(dataWithStock);

  return (
    <div className="grid grid-cols-2 gap-2">
      {product.length > 0 ? (
        product.map((e, i) => <Card key={i} data={e} />)
      ) : (
        <div className="col-span-2 ">
          <span className=" text-slate-300">{message}</span>
          <h2 className="text-2xl text-slate-500">
            Lista de establecimientos con Stock
          </h2>
          <hr />

          {/* Mostrar lista de almacenes con stock */}
          <div className="flex flex-col gap-2 mt-5">
            {establec_ordenados.map((establecimiento, index) => (
              <EstablecimientoItem
                name={establecimiento.nombre}
                // stock={establecimiento.onHand}
                key={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
