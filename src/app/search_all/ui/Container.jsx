"use client";
import React, { useEffect, useState } from "react";
import InputSearch from "./inputSearch";
import { ResultContainer } from "@/components/search_all/resultContainer";
import { Loader } from "@/components/ui/Loader";
import { establecimientoStore } from "@/store/establecimientoStore";
import { toast } from "sonner";
import { Pagination } from "@/components/ui/Pagination";

export const Container = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [itemCode, setItemCode] = useState("");
  const [wshCode, setwshCode] = useState("");
  const [product, setProduct] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [message, setMessage] = useState("");


  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  const getProduct = async () => {
    setIsLoading(true);
    let url = `/api/Articulo/ConsultarStock?ItemCode=${itemCode.toUpperCase()}&WshCode=${wshCode}`;

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


  // Guardar en establecimientoStore
  const setEstablecimientos = establecimientoStore(state => state.setEstablecimientos)
  useEffect(() => {
    setEstablecimientos();
  }, [])


  const handleSearch = async () => {
    if (!itemCode.trim()) {
      toast.warning("Por favor, ingresa un término de búsqueda.")
      return;
    }
    await getProduct();
    setCurrentPage(1);
    setHasSearched(true);
  };



  // Calcular productos a mostrar en función de la página actual
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



  return (
    <div className="flex flex-col items-center gap-2 p-4  ">

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
            product={currentProducts}
            message={message}
          />
        ))}



      {/* Pagination */}
      {product.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={product.length}
          onPageChange={handlePageChange}
        />
      )}
    </div>


  );
};
