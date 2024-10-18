import { searchedModel } from "@/models/searchedModel";

export const searchedController = {
    get: async () => {
        try {
            const result = await searchedModel.get();
            return result;
        } catch (error) {
            return { success: false, message: "Error en la consulta" };
        }
    },
    insert: async (id_user_establec, description) => {
        try {
            const result = await searchedModel.insert(id_user_establec, description);

            return result
        } catch (error) {
            console.log(error);
            return { success: false, message: "Error en la consulta" };
        }
    },
}