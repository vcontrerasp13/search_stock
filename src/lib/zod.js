import { object, string } from "zod"

export const signInSchema = object({
  username: string({ required_error: "Nombre de Usuario es requerido" })
    .min(1, "Usuario es requerido"),
  password: string({ required_error: "La constrase es requerido" })
    .min(1, "Password is required"),
    // .min(6, "La contraseña al menos debe tener 6 caracteres")
    // .max(32, "La contraseña debe tener menos de 32 caracteres"),
})