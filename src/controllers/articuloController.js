import { articuloModel } from "@/models/articuloModel";

export const articuloController = {
    get: async () => {
        try {
            const result = await articuloModel.get();
            return result;
        } catch (error) {
            return { success: false, message: "Error en la consulta" };
        }
    },
    insert: async (id, description, codeBars) => {
        try {
            const result = await articuloModel.insert(id, description, codeBars);

            return result
        } catch (error) {
            console.log(error);
            return { success: false, message: "Error en la consulta" };
        }
    },
}