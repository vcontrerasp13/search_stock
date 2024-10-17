// import { HeaderSearch } from "@/components/search/header";
// import { Container } from "./ui/Container";

import { HiOutlineMapPin } from "react-icons/hi2";

const pageEstablecimientos = () => {
  return (
    <div className="flex flex-col p-2 gap-2">
      <h2 className="text-3xl">Seleccionar Establecimiento</h2>
      {/* lista de sedes con stock */}
     
      <div className="btn btn-block btn-secondary uppercase">
        <HiOutlineMapPin />
        ate
      </div>
      <div className="btn btn-block btn-success uppercase">
        <HiOutlineMapPin />
        Mall
      </div>
    </div>
  );
};

export default pageEstablecimientos; //
