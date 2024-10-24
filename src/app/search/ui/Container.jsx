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
import { GroupedData } from "./GroupedData";

export const Container = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [itemCode, setItemCode] = useState(""); // Valor ingresado por el usuario
  const [searchCode, setSearchCode] = useState(""); // Código que se usará para la búsqueda
  const [product, setProduct] = useState([]);
  const [message, setMessage] = useState("");
  const [groupedData, setGroupedData] = useState([]);
  const [isCodPadre, setIsCodPadre] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const user = userStore((state) => state.user);
  const setEstablecimientos = establecimientoStore((state) => state.setEstablecimientos);

  useEffect(() => {
    setEstablecimientos();
  }, [setEstablecimientos]);

  const getProduct = async (searchTerm) => {
    setIsLoading(true);

    // Limpiar los resultados y mensajes anteriores antes de buscar
    setProduct([]);
    setGroupedData([]);
    setMessage("");

    const url = `/api/Articulo/ConsultarStock?ItemCode=${searchTerm.toUpperCase()}&WshCode=${user.id_establec_current}`;

    try {
      const response = await fetch(url);
      if (response.status === 400) {
        const errorData = await response.json();
        setMessage(errorData.message || "Error desconocido");
        setProduct([]);
      } else {
        const data = await response.json();
        if (data.length === 0) {
          setMessage("No se encontraron productos con el código ingresado.");
        }
        setProduct(data);
      }
    } catch (error) {
      console.log(error);
      setMessage("Hubo un error en la búsqueda.");
    } finally {
      setIsLoading(false);
    }
  };

  const groupProducts = (products, searchTerm) => {
    const filteredData = products.filter((item) =>
      item.itemCode.split("-")[0] === searchTerm.toUpperCase()
    );
    return filteredData;
  };

  const totalAgrouped = groupProducts(product, searchCode).reduce(
    (acc, current) => (acc += current.onHand),
    0
  );

  const handleSearch = async () => {
    const trimmedCode = itemCode.trim();
    if (!validateItemCode(trimmedCode)) return;

    // Limpiar resultados de productos y agrupados antes de iniciar la búsqueda
    setProduct([]);
    setGroupedData([]);
    setMessage("");

    setIsCodPadre(!trimmedCode.includes("-"));
    
    // Actualizar `searchCode` y hacer la búsqueda después de asegurarse de que se actualizó el estado
    await new Promise(resolve => {
      setSearchCode(trimmedCode);
      resolve();
    });

    await getProduct(trimmedCode); // Hacer la búsqueda de productos

    const articulos = await getArticulo();
    const findArticulo = articulos.data.some((a) => a.id === trimmedCode);
    if (findArticulo) {
      console.log("guardar en la bd");
    } else {
      console.log("No se guardará registro porque no se encontró el itemCode");
    }

    setCurrentPage(1);
  };

  const validateItemCode = (code) => {
    if (!code) {
      toast.warning("Por favor ingresar un código.");
      return false;
    }

    if (code.length < 4) {
      toast.warning("El código debe tener al menos 4 caracteres.");
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (!searchCode.includes("-") && product.length > 0) {
      setGroupedData(groupProducts(product, searchCode));
    }
  }, [product, searchCode]);

  const totalItems = searchCode.includes("-") ? product.length : groupedData.length;
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);
  const currentGroupedData = groupedData.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center gap-2 px-4">
      <InputSearch setItemCode={setItemCode} itemCode={itemCode} handleSearch={handleSearch} />

      <div className="w-full min-h-80">
        {isLoading ? (
          <Loader />
        ) : product.length > 0 ? (
          isCodPadre ? (
            <GroupedData currentGroupedData={currentGroupedData} total={totalAgrouped} />
          ) : (
            <ResultContainer product={currentProducts} message={message} itemCode={searchCode} />
          )
        ) : (
          <Image
            src={search_img}
            width={500}
            height={500}
            alt="imag-search"
            className="h-62 mt-10 m-auto pointer-events-none opacity-30"
          />
        )}
      </div>

      {product.length > 0 && totalItems > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
