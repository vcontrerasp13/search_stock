import Link from "next/link";
import LoginForm from "./login/ui/LoginForm";
import { NavSearch } from "./search/ui/NavSearch";

export default function Home() {
  return (
    <div className="min-h-screen">
      <NavSearch />
      <div className="flex gap-5 p-2 flex-col justify-center items-center ">
        {/* <h2 className="text-3xl">Bienvenido Administrador</h2> */}

        <Link
          href="/search"
          className="btn btn-info btn-block text-info-content "
        >
          Buscar producto
        </Link>

        <Link
          href="/search_all"
          className="btn btn-accent btn-block text-accent-content"
        >
          Buscar (todos)
        </Link>
      </div>
    </div>
  );
}
