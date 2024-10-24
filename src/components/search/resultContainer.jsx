"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { establecimientoStore } from "@/store/establecimientoStore";
import { EstablecimientoItem } from "./establecimientoItem";
import Card from "@/app/search/ui/Card";
import { productStore } from "@/store/productStore";
import { userStore } from "@/store/userStore";
import { ordernarEstablecimientosDistancia } from "../../../utils/helper";
import box_empty from "/public/images/image1.svg";
import { toast } from "sonner";

export const ResultContainer = ({ product, message, itemCode = "" }) => {
  const establecimientos = establecimientoStore((state) => state.establecimientos);
  const userdata = userStore((state) => state.user);
  const [loading, setLoading] = useState(false);  // Estado de carga

  let establec_ordenados = [];
  let productosConEstablecimiento = []

  const setProduct = productStore((state) => state.setProduct);
  let productos = productStore((state) => state.product);

  if (productos.statusCode !== 400) {
    productosConEstablecimiento = productos
      .filter((producto) => establecimientos.some((e) => e.id === producto.codBode)) // Filtrar los productos con establecimiento válido
      .map((producto) => {
        const establecimiento = establecimientos.find((e) => e.id === producto.codBode);
        return {
          itemCode: producto.itemCode,
          cantidad: producto.onHand,
          id: establecimiento.id,
          nombre: establecimiento.nombre,
          lat: establecimiento.lat,
          lon: establecimiento.lon,
        };
      });


    const origen = establecimientos.find((e) => e.id === userdata.id_establec_current);
    establec_ordenados = ordernarEstablecimientosDistancia(productosConEstablecimiento, origen);
  }

  useEffect(() => {
    setProduct(itemCode);
  }, []);

  useEffect(() => {
    // Actualizar el estado de carga una vez que se procesen los productos
    if (productos.length > 0 && establecimientos.length > 0) {
      setLoading(true);
    }
  }, [establecimientos]);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {product.length > 0
        ? product.map((e, i) => <Card key={i} data={e} />)
        : (
          <div className="col-span-2 items-center">
            <p className="text-center text-orange-400">{message}</p>
            <Image
              src={box_empty}
              width={500}
              height={500}
              alt="imagen-vacía"
              className="h-62 mt-10 m-auto pointer-events-none opacity-30"
            />


            {/* Mostrar lista de almacenes con stock */}
            {
              (productos.statusCode !== 400 && productos.length > 0 && productosConEstablecimiento.length > 0) &&
              <>
                <h2 className="text-2xl text-slate-500 mt-5">Lista de establecimientos con Stock</h2>
                <hr />
                <div className="flex flex-col gap-2 mt-5">
                  {establec_ordenados.map((establecimiento, index) => (
                    <EstablecimientoItem e={establecimiento} key={index} />
                  ))}
                </div>
              </>
            }

          </div>
        )}
    </div>
  );
};
