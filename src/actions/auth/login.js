"use server";
import { signIn } from "@/auth";
// import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";
import { object } from "zod";

// ...

// export async function authenticate(
//     prevState,
//     formData
// ) {
//     try {
//         // console.log(Object.fromEntries(formData));
//         await signIn("credentials", formData);
//     } catch (error) {
//         if (error instanceof AuthError) {
//             switch (error.type) {
//                 case "CredentialsSignin":
//                     return "Invalid credentials.";
//                 default:
//                     return "Something went wrong.";
//             }
//         }
//         throw error;
//     }
// }

export const login = async (username, password) => {
    try {
        const response = await signIn("credentials", { username, password, redirect: false });
        console.log(response, '🎶🟢🚩🟢🟢');
        return {
            ok: true,
            message: "Inicio de Sessión correctamente"
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "No se pudo iniciar Session",
        };
    }
};
