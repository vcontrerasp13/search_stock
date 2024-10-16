import { establecimientoModel } from "@/models/establecimientoModel";

export const establecimientoController = async () => {
    try {
        const establecimientos = await establecimientoModel();

        return establecimientos
    } catch (error) {
        console.log(error);
        return { success: false, message: "Error en la consulta" };
    }

};