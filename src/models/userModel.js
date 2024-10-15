import { pool } from '@/lib/db';

export const loginModel = async (username, password) => {
    try {
        let message = 'Login Exitoso';
        const result = await pool.query('SELECT * FROM tbl_users WHERE user_name=$1', [username]);
        if (result.rows.length === 0) {
            // throw new Error('Usuario no encontrado');
            message = "Usuario no encontrado"
            return { success: false, message }
        }

        const user = result.rows[0];

        // Comparar la contraseña 
        if (user.password !== password) {
            // throw new Error('Contraseña incorrecta');
            message = 'Contraseña incorrecta';
            return { success: false, message }
        }

        return { success: true, message, user };
    } catch (error) {
        console.error('Error en loginUser:', error.message);
        throw error;
    }
};
