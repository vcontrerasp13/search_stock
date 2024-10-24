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
  const [itemCode, setItemCode] = useState("");
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

  const getProduct = async () => {
    setIsLoading(true);
    const url = `/api/Articulo/ConsultarStock?ItemCode=${itemCode.toUpperCase()}&WshCode=${user.id_establec_current}`;

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

  const groupProducts = (products) => {
    return Object.values(
      products.reduce((acc, item) => {
        const [codPadre, colorCode] = item.itemCode.split("-");
        const key = `${codPadre}-${colorCode}`;

        if (acc[key]) {
          acc[key].cantidad += item.onHand;
        } else {
          acc[key] = { codPadre, colorCode, cantidad: item.onHand };
        }
        return acc;
      }, {})
    );
  };

  const handleSearch = async (code) => {
    const trimmedCode = code.trim();
    if (!validateItemCode(trimmedCode)) return;

    setIsCodPadre(!trimmedCode.includes("-"));
    await getProduct();

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
    if (!itemCode.includes("-") && product.length > 0) {
      setGroupedData(groupProducts(product));
    }
  }, [product, itemCode]);

  const totalItems = itemCode.includes("-") ? product.length : groupedData.length;
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
        {isLoading
          ? (<Loader />)
          : product.length > 0
            ? (
              isCodPadre
                ? (<GroupedData currentGroupedData={currentGroupedData} product={product} />)
                : (<ResultContainer product={currentProducts} message={message} itemCode={itemCode} />)
            ) : (<Image src={search_img} width={500} height={500} alt="imag-search" className="h-62 mt-10 m-auto pointer-events-none opacity-30" />)}
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
