'use client'
import { establecimientoStore } from "@/store/establecimientoStore";

const Card = ({ data }) => {

  const establecimientos = establecimientoStore((state) => state.establecimientos);
  // const userdata = userStore((state) => state.user);


  let nom_establ = establecimientos.find((e) => e.id === data.codBode);
  // if (!nom_establ) return null;

  return (
    // <div className="flex flex-col p-2 w-full">
    <div className="border p-2 rounded-md ">
      <h3 className="font-bold  truncate">
        Estab.:
        <span className="font-light ">
          {nom_establ ? nom_establ.nombre : "Establecimiento no encontrado"}
        </span>
      </h3>
      <p className="font-bold">
        cod: <span className="font-light">{data.itemCode}</span>
      </p>
      <p className="font-bold">
        Cantidad: <span className="font-light">{data.onHand}</span>
      </p>
    </div>
    // </div>
  );
};

export default Card;
