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
  const [groupedData, setGroupedData] = useState([]);

  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Obtener usuario de userStore
  const user = userStore((state) => state.user);

  // Guardar en establecimientoStore
  const setEstablecimientos = establecimientoStore((state) => state.setEstablecimientos);

  useEffect(() => {
    setEstablecimientos();
  }, []);

  // Obtener productos desde el API
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

  // Manejar búsqueda
  const handleSearch = async () => {
    if (!itemCode.trim()) {
      toast.warning("Por favor ingresar un código.");
      return;
    }

    if (itemCode.length < 4) {
      toast.warning("El código debe tener al menos 4 caracteres.");
      return;
    }
    await getProduct();

    // if (itemCode.includes("-")) {
    // Si el itemCode incluye "-", buscar producto normalmente
    // await getProduct();
    // } else {
    if (!itemCode.includes("-")) {
      // Agrupar por [padre-color]
      // await getProduct();
      console.log(product, '👀👀')
      const grouped = Object.values(product.reduce((acc, item) => {
        const colorCode = item.itemCode.split('-')[1];
        const codPadre = item.itemCode.split('-')[0];

        const key = `${codPadre}-${colorCode}`;
        if (acc[key]) {
          acc[key].cantidad += item.onHand;
        } else {
          acc[key] = { codPadre, colorCode, cantidad: item.onHand };
        }

        return acc;
      }, {}));
      setGroupedData(grouped);
    }

    // Buscar artículo en la base de datos
    const articulos = await getArticulo();
    const findArticulo = articulos.data.some(a => a.id === itemCode.trim());
    if (findArticulo) {
      console.log("guardar en la bd");
      // await insertArticulo();
    } else {
      toast.warning("No se encontró el itemCode en la bd");
    }

    setCurrentPage(1);
    setHasSearched(true);
  };

  // Calcular productos a mostrar en función de la página actual
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  // Determinar los productos actuales a mostrar
  const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);
  const currentGroupedData = groupedData.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Total de elementos para paginación
  const totalItems = itemCode.includes("-") ? product.length : groupedData.length;

  return (
    <div className="flex flex-col items-center gap-2 px-4">
      {/* Input Search */}
      <InputSearch
        setItemCode={setItemCode}
        itemCode={itemCode}
        handleSearch={handleSearch}
      />

      {/* Container Result */}
      <div className="w-full min-h-80">
        {hasSearched ? (
          isLoading ? (
            <Loader />
          ) : itemCode.includes("-") ? (
            <ResultContainer
              product={currentProducts}
              message={message}
              itemCode={itemCode}
            />
          ) : (
            <div className="grid grid-cols-2 gap-2 w-full ">
              {currentGroupedData.length > 0 && currentGroupedData.map((color, i) => (
                <div key={i} className="border p-2 rounded-md">
                  <p className="text-base font-semibold">COD:
                    <span className="text-base font-normal">{color.codPadre} - {color.colorCode}</span>
                  </p>
                  <p className="text-base font-semibold">Cantidad:
                    <span className="text-base font-normal">{color.cantidad}</span>
                  </p>
                </div>
              ))}
            </div>
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

      {/* Paginación */}
      {totalItems > itemsPerPage && (
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


















// "use client";
// import React, { useEffect, useState } from "react";
// import InputSearch from "./inputSearch";
// import { ResultContainer } from "@/components/search/resultContainer";
// import { Loader } from "@/components/ui/Loader";
// import { userStore } from "@/store/userStore";
// import { toast } from "sonner";
// import Image from "next/image";
// import search_img from "/public/images/image2.svg";
// import { Pagination } from "@/components/ui/Pagination";
// import { establecimientoStore } from "@/store/establecimientoStore";
// import { getArticulo } from "@/actions/articulo/getArticulo";

// export const Container = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [itemCode, setItemCode] = useState("");
//   const [product, setProduct] = useState([]);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [message, setMessage] = useState("");
//   const [groupedData, setGroupedData] = useState([]);

//   const user = userStore((state) => state.user);

//   // Estado para paginación
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // obtner Productos
//   const getProduct = async () => {
//     setIsLoading(true);
//     let url = `/api/Articulo/ConsultarStock?ItemCode=${itemCode.toUpperCase()}&WshCode=${user.id_establec_current}`;

//     try {
//       const response = await fetch(url);

//       if (response.status === 400) {
//         const errorData = await response.json();
//         setMessage(errorData.message || "Error desconocido");
//         setProduct([]);
//       } else {
//         const data = await response.json();
//         setProduct(data);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };



//   // Guardar en establecimientoStore
//   const setEstablecimientos = establecimientoStore(state => state.setEstablecimientos)
//   useEffect(() => {
//     setEstablecimientos();
//   }, [])


//   const handleSearch = async () => {
//     if (!itemCode.trim()) {
//       toast.warning("Por favor ingresar un cod.");
//       return;
//     }

//     if (itemCode.length < 4) {
//       toast.warning("El código debe tener al menos 4 caracteres.")
//       return;
//     }

//     if (itemCode.includes("-")) {
//       // mostrar el producto
//       await getProduct();

//     } else {
//       // mostrar agrupado por [padre-color]
//       const grouped = Object.values(product.reduce((acc, item) => {
//         // Extraer el código de color (en este caso "BLA" o "AZU")
//         const colorCode = item.itemCode.split('-')[1];
//         const codPadre = item.itemCode.split('-')[0];

//         const key = `${codPadre}-${colorCode}`;
//         // Si el código ya existe en el acumulador, sumar el onHand
//         if (acc[key]) {
//           acc[key].cantidad += item.onHand;
//         } else {
//           // Si no existe, crear un nuevo objeto con colorCode y cantidad
//           acc[key] = { codPadre: codPadre, colorCode, cantidad: item.onHand };
//         }

//         return acc;
//       }, {}));
//       setGroupedData(grouped);
//     }

//     // buscar Articulo deseado en la base de datos de Articulos
//     const articulos = await getArticulo();

//     const findArticulo = articulos.data.some(a => a.id === itemCode.trim());
//     // si existe el articulo, se guardará en la tbl_searched
//     if (findArticulo) {
//       console.log("guardar en la bd")
//       // await insertArticulo()
//     } else {
//       toast.warning("no se encontró el itemCOde en la bd")
//     }

//     setCurrentPage(1);
//     setHasSearched(true);
//   };

//   // Calcular productos a mostrar en función de la página actual
//   const indexOfLastProduct = currentPage * itemsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
//   const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

//   // Cambiar página
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };


//   return (
//     <div className="flex flex-col items-center gap-2 px-4 ">
//       {/* Input Search */}
//       <InputSearch
//         setItemCode={setItemCode}
//         itemCode={itemCode}
//         handleSearch={handleSearch}
//       />

//       {/* container Result */}
//       <div className="w-full  min-h-80">
//         {hasSearched ? (
//           isLoading ? (
//             <Loader />
//           ) : (
//             <ResultContainer
//               product={currentProducts}
//               message={message}
//               itemCode={itemCode}
//             />
//           )
//         ) : (
//           <Image
//             src={search_img}
//             width={500}
//             height={500}
//             alt="imag-search"
//             className=" h-62 mt-10 m-auto pointer-events-none opacity-30"
//           />
//         )}
//       </div>

//       {/* Pagination */}
//       {product.length > itemsPerPage && (
//         <Pagination
//           currentPage={currentPage}
//           itemsPerPage={itemsPerPage}
//           totalItems={product.length}
//           onPageChange={handlePageChange}
//         />
//       )}

//       {/* Agrupado por [padre-color] */}
//       <div className=" grid grid-cols-2 gap-2 w-full bg-slate-300">

//         {

//           groupedData.map((color, i) => (
//             <div key={i} className="border p-2 rounded-md">

//               <p className="text-base font-semibold">COD:

//                 <span className="text-base font-normal">
//                   {color.codPadre} - {color.colorCode}

//                 </span>
//               </p>
//               <p className="text-base font-semibold">Cantidad:
//                 <span className="text-base font-normal">
//                   {color.cantidad}
//                 </span>
//               </p>
//             </div>
//           )

//           )
//         }
//       </div>

//     </div>
//   );
// };




