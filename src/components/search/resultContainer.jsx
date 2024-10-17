"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { establecimientoStore } from "@/store/establecimientoStore";
import { EstablecimientoItem } from "./establecimientoItem";
import Card from "@/app/search/ui/Card";
import { productStore } from "@/store/productStore";
import { userStore } from "@/store/userStore";
import { ordernarEstablecimientosDistancia } from "../../../utils/helper";
import box_empty from "/public/images/image1.svg"

export const ResultContainer = ({ product, message, itemCode = "" }) => {
  const establecimientos = establecimientoStore((state) => state.establecimientos);
  const userdata = userStore((state) => state.user);

  console.log(product.length); //0

  const setProduct = productStore((state) => state.setProduct);
  const productos = productStore((state) => state.product);

  useEffect(() => {
    setProduct(itemCode);
  }, [itemCode]);


  const productosConEstablecimiento = productos
    .filter((producto) => establecimientos.some((e) => e.id === producto.codBode)) // Filtrar los productos con establecimiento válido
    .map((producto) => {
      const establecimiento = establecimientos.find((e) => e.id === producto.codBode);
      return {
        itemCode: producto.itemCode,
        cantidad: producto.onHand,
        id: establecimiento.id,
        nombre: establecimiento.nombre,
        lat: establecimiento.lat,
        lon: establecimiento.lon
      };
    });

    console.log(productosConEstablecimiento);

  const origen = establecimientos.find((e) => e.id === userdata.cod_establec);
  console.log(origen);
  // const origen = establecimientos.find((e) => e.id == "ALM109");
  const establec_ordenados = ordernarEstablecimientosDistancia(productosConEstablecimiento, origen);



  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {product.length > 0
        ? (product.map((e, i) => <Card key={i} data={e} />))
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
            <h2 className="text-2xl text-slate-500 mt-5">
              Lista de establecimientos con Stock
            </h2>
            <hr />

            {/* Mostrar lista de almacenes con stock */}
            <div className="flex flex-col gap-2 mt-5">
              {establec_ordenados.map((establecimiento, index) => (
                <EstablecimientoItem e={establecimiento} key={index} />
              ))}
            </div>
          </div>
        )}
    </div>
  );
};
