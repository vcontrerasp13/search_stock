"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "/public/images/logo.jpg";
import { HiOutlineKey, HiOutlineUser } from "react-icons/hi2";
// import { loginAction } from "@/actions/loginAction";
import { toast } from "sonner";
// import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { login } from "@/actions/auth/login";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const router = useRouter();


  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const result = await loginAction(username, password);
  //     if (result.success) {
  //       toast.info(result.message);
  //     } else {
  //       toast.error(result.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };


  const onSubmit = async (data) => {
    setErrorMessage("");
    const { username, password } = data;
    // console.log(data)
    try {
      setLoading(true);
      const response = await login(username, password);
      if (!response.ok) {
        toast.error(response.message)
      }
      router.push('/')
    } catch (error) {
      console.log(error)
    } finally {

      setLoading(false)
    }
  }


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
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="input input-bordered flex items-center gap-2">
            <HiOutlineUser />

            <input
              type="text"
              className="grow"
              placeholder="Username"
              // value={username}
              // onChange={(e) => setUsername(e.target.value)}
              // required
              {...register('username', { required: true })}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <HiOutlineKey />
            <input
              type="password"
              className="grow"
              placeholder="********"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              // required
              {...register('password', { required: true })}
            />
          </label>

          {/* <SelectEstablecimiento  /> */}
          <span className="text-red-500">{errorMessage} </span>
          <div>
            <button type="submit" className={`btn btn-block ${!loading ? " btn-primary" : "btn-disabled"}`}
              disabled={loading}>
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
