// import { loginModel, userModel } from '@/models/userModel.js';
import { userModel } from '@/models/userModel.js';



// export const loginController = async (username, password) => {

//     try {
//         // console.log({ username, password });
//         const users = await loginModel(username, password);

//         return users
//     } catch (error) {
//         console.log(error);
//         return { success: false, message: "Error al intentar iniciar sesión." };
//     }
// };



export const userController = {
    update: async (establecimiento, id_user) => {
        try {
            const result = await userModel.update(establecimiento, id_user);
            return result;
        } catch (error) {
            return { success: false, message: "Error al intentar iniciar sesión." };
        }
    },
    getOne: async (id) => {

        try {
            const result = await userModel.getOne(id);
            return result;
        } catch (error) {
            return { success: false, message: "Error en la consulta" };
        }
    },
    login: async (username, password) => {
        try {
            // console.log({ username, password });
            const users = await userModel.login(username, password);

            return users
        } catch (error) {
            console.log(error);
            return { success: false, message: "Error al intentar iniciar sesión." };
        }
    }

}