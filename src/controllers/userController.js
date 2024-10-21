import { loginModel } from '@/models/userModel.js';



export const loginController = async (username, password) => {

    try {
        console.log({ username, password });
        const users = await loginModel(username, password);

        return users
    } catch (error) {
        console.log(error);
        return { success: false, message: "Error al intentar iniciar sesión." };
    }
};
