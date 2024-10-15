"use client";
import React, { useEffect, useState } from "react";
import InputSearch from "./inputSearch";
import { ResultContainer } from "@/components/search/gridResult";
import { Loader } from "@/components/ui/Loader";

export const Container = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [itemCode, setItemCode] = useState("");
  const [wshCode, setwshCode] = useState("");
  const [product, setProduct] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [message, setMessage] = useState("");

  const getProduct = async () => {
    setIsLoading(true);
    let url = `/api/Articulo/ConsultarStock?ItemCode=${itemCode.toUpperCase()}&WshCode=${wshCode}`;

    try {
      const response = await fetch(url);

      if (response.status === 400) {
        const errorData = await response.json(); // Extrae los detalles del error
        setMessage(errorData.message || "Error desconocido"); // Muestra el mensaje de error si existe
        setProduct([]); // Vacía los productos
      } else {
        const data = await response.json(); // Extrae los datos si la respuesta es exitosa
        setProduct(data); // Establece los productos con los datos recibidos
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!itemCode.trim()) {
      alert("Por favor, ingresa un término de búsqueda.");
      return;
    }
    await getProduct();

    setHasSearched(true);
  };

  return (
    <div className=" ">
      {/* Input Search */}

      <InputSearch
        setItemCode={setItemCode}
        itemCode={itemCode}
        handleSearch={handleSearch}
      />
      {/* container Result */}

      {hasSearched &&
        (isLoading ? (
          <Loader />
        ) : (
          <ResultContainer product={product} message={message} />
        ))}
    </div>
  );
};
