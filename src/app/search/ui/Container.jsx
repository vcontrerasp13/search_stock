"use client";
import React, { useEffect, useState } from "react";
import InputSearch from "./inputSearch";
import { ResultContainer } from "@/components/search/resultContainer";
import { Loader } from "@/components/ui/Loader";
import { userStore } from "@/store/userStore";
import { toast } from "sonner";
import Image from "next/image";
import search_img from "/public/images/image2.svg";
import { Pagination } from "@/components/ui/Pagination";
import { establecimientoStore } from "@/store/establecimientoStore";
import { getArticulo } from "@/actions/articulo/getArticulo";

export const Container = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [itemCode, setItemCode] = useState("");
  const [product, setProduct] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [message, setMessage] = useState("");
  const user = userStore((state) => state.user);


  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  // obtner Productos
  const getProduct = async () => {
    setIsLoading(true);
    let url = `/api/Articulo/ConsultarStock?ItemCode=${itemCode.toUpperCase()}&WshCode=${user.establecimientos[0].id}`;

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
      toast.warning("Por favor ingresar un cod.");
      return;
    }
    await getProduct();

    // buscar Articulo deseado en la base de datos de Articulos
    const articulos = await getArticulo();
    console.log(articulos, '💀💀');
    const findArticulo = articulos.data.some(a => a.id === itemCode.trim());
    // si existe el articulo, se guardará en la tbl_searched 
    if (findArticulo) {
      console.log("guardar en la bd")
      await insertArticulo()
    } else {
      toast.warning("no se encontró en la bd")
    }

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
    <div className="flex flex-col items-center gap-2 ">
      {/* Input Search */}
      <InputSearch
        setItemCode={setItemCode}
        itemCode={itemCode}
        handleSearch={handleSearch}
      />

      {/* container Result */}

      <div className="w-full  min-h-80">
        {hasSearched ? (
          isLoading ? (
            <Loader />
          ) : (
            <ResultContainer
              product={currentProducts}
              message={message}
              itemCode={itemCode}
            />
          )
        ) : (
          <Image
            src={search_img}
            width={500}
            height={500}
            alt="imag-search"
            className=" h-62 mt-10 m-auto pointer-events-none opacity-30"
          />
        )}
      </div>

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
