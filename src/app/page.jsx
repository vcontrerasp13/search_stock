import Link from "next/link";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";

export default function Home() {
  return (
    <div className="p-2">
      {/* <NavSearch /> */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 ">
        {/* <h2 className="text-3xl">Bienvenido Administrador</h2> */}

        <Link
          href="/search"
          className="btn btn-info btn-outline  text-info-content border border-dashed h-[100px]"
        >
          <div className="flex flex-col items-center justify-center gap-2 ">
            <HiOutlineSearch size={30} />
            <p className="text-2xl">Buscar producto</p>
          </div>
        </Link>

        <Link
          href="/search_all"
          className="btn btn-accent btn-outline btn-block text-accent-content border border-dashed h-[100px]"
        >
          <div className="flex flex-col items-center justify-center gap-2 ">
            <HiOutlineGlobeAlt size={30} />
            <p className="text-2xl">Buscar (todos)</p>
          </div>
        </Link>
        <Link
          href="/establecimientos"
          className="btn btn-warning btn-block  btn-outline text-accent-content border border-dashed h-[100px]"
        >
          <div className="flex flex-col items-center justify-center gap-2 ">
            <HiOutlineOfficeBuilding size={30} />
            <p className="text-2xl">Establecimientos</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
