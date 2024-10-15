import { loginModel } from '@/models/userModel.js';



export const loginController = async (user, password) => {

    try {
        const users = await loginModel(user, password);

        return users
    } catch (error) {
        console.log(error);
        return { success: false, message: "Error al intentar iniciar sesión." };
    }
};
