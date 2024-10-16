"use client";
import React, { useEffect, useState } from "react";
import InputSearch from "./inputSearch";
import { ResultContainer } from "@/components/search/resultContainer";
import { Loader } from "@/components/ui/Loader";
import { userStore } from "@/store/userStore";
import { toast } from "sonner";
import { establecimientoStore } from "@/store/establecimientoStore";

export const Container = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [itemCode, setItemCode] = useState("");
  const [product, setProduct] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [message, setMessage] = useState("");
  const user = userStore((state) => state.user);

  const setEstablecimientos = establecimientoStore(
    (state) => state.setEstablecimientos
  );

  useEffect(() => {
    setEstablecimientos();
  }, []);

  const getProduct = async () => {
    setIsLoading(true);
    let url = `/api/Articulo/ConsultarStock?ItemCode=${itemCode.toUpperCase()}&WshCode=${
      user.cod_establ
    }`;

    try {
      const response = await fetch(url);

      if (response.status === 400) {
        const errorData = await response.json();
        setMessage(errorData.message || "Error desconocido");
        setProduct([]);
      } else {
        const data = await response.json();
        setProduct(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!itemCode.trim()) {
      toast.warning("Por favor ingresar un cod.");
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
          <ResultContainer
            product={product}
            message={message}
            itemCode={itemCode}
          />
        ))}
    </div>
  );
};
