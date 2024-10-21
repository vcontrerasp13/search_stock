"use client";
import { login } from "@/actions/auth/login";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// import { authenticate } from "@/actions";

export const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false)

    const router = useRouter();
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
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col">
            <label htmlFor="email">Correo electrónico</label>
            <input
                className={`px-5 py-2 border rounded mb-5 ${errors.email ? "border-red-500" : " bg-gray-200 "}`}
                type="text"
                {...register('username', { required: true })}
            />

            <label htmlFor="password">Contraseña</label>
            <input
                className={`px-5 py-2 border rounded mb-5 ${errors.password ? "border-red-500" : " bg-gray-200 "}`}
                type="password"
                {...register('password', { required: true })}
            />
            <span className="text-red-500">{errorMessage} </span>

            <LoginButton loading={loading} />


        </form>
    );
};

function LoginButton({ loading }) {

    return (
        <button
            type="submit"
            className={`btn btn-block ${!loading ? " btn-primary" : "btn-disabled"}`}
            disabled={loading}
        >
            Ingresar
        </button>
    );
}
