"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { handleSignOut } from "@/actions/auth/logout";
import { userStore } from "@/store/userStore";
import { useSession } from "next-auth/react";

export const NavSearch = ({ session }) => {
  const { data, status } = useSession()

  const { id_user } = session.user.user;
  const [loading, setLoading] = useState(false);

  const setDataUser = userStore(state => state.setDataUser);
  const user = userStore(state => state.user);

  const closeSession = async () => {
    setLoading(true);
    await handleSignOut()
    setLoading(false);
  }



  useEffect(() => {
    if (id_user) {
      setDataUser(id_user)
    }

  }, [id_user, setDataUser, loading])

  return (
    <div className="navbar bg-accent text-accent-content sticky top-0 z-50">
      <div className="flex-1">

        {
          status === 'loading'
            ? (<div className="skeleton h-5 w-40"></div>)
            : (<Link href="/" className="btn btn-ghost text-xl">{user?.username}  - {user?.establec_current} </Link>)

        }
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Perfil
              </a>
            </li>
            <li>
              <Link href='/configuration'>Configuración</Link>
            </li>
            <li>
              <button onClick={closeSession} disabled={loading}> {loading ? "Cerrando..." : "Cerrar"}</button>
            </li>
          </ul>
        </div>
      </div>
    </div >
  );
};
