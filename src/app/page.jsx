import Link from "next/link";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";
import { NavSearch } from "./search/ui/NavSearch";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { FaUserCog } from "react-icons/fa";
export default async function Home() {
  const session = await auth();

  if (!session) {
    return redirect('/auth/signin');
  }

  return (
    <div className="">
      <NavSearch session={session} />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 p-4 ">
        {/* <h2 className="text-3xl">Bienvenido Administrador</h2> */}

        <Link
          href="/search"
          className="btn btn-info btn-outline  text-info-content border border-dashed h-[100px]"
        >
          <div className="flex flex-col items-center justify-center gap-2 ">
            <HiOutlineSearch size={30} className="font-bold" />
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

        {/* Mantenimineto Usuarios */}
        <Link
          href="/mantenimiento_user"
          className="btn btn-secondary btn-block  btn-outline text-secondary-content border border-dashed h-[100px]"
        >
          <div className="flex flex-col items-center justify-center gap-2 ">
            <FaUserCog size={30} />
            <p className="text-2xl" title="Mantenimiento Usuario">Mantenimiento</p>
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
