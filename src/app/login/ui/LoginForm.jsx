"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "/public/images/logo.jpg";
import { HiOutlineKey, HiOutlineUser } from "react-icons/hi2";
import { loginAction } from "@/actions/loginAction";
import { toast } from "sonner";
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUser = userStore((state) => state.setUser);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await loginAction(username, password);
      if (result.success) {
        toast.info(result.message);
        // guardar en localStorage
        localStorage.setItem("user", JSON.stringify(result.data));
        // actualizar el estado de User
        setUser(result.data);
        
        router.push("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          width={500}
          height={500}
          className="mx-auto  w-auto"
          src={logo}
          alt="logo kayser"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Ingresar Cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleLogin}
        >
          <label className="input input-bordered flex items-center gap-2">
            <HiOutlineUser />

            <input
              type="text"
              className="grow"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <HiOutlineKey />
            <input
              type="password"
              className="grow"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div>
            <button type="submit" className="btn btn-primary btn-block">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
