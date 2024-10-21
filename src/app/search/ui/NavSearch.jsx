"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { handleSignOut } from "@/actions/auth/logout";
import { userStore } from "@/store/userStore";

export const NavSearch = ({ session }) => {
  const { username, establecimientos } = session.user;
  console.log(session, '🚩🚩')
  const setUser = userStore(state => state.setUser);



  const closeSession = async () => {
    await handleSignOut()
  }

  useEffect(() => {
    setUser(session.user);

  }, [])

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          {username} - {establecimientos.map(e => e.id).join(' || ')}
        </Link>
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
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button onClick={closeSession}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
