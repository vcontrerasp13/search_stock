import { pool } from '@/lib/db';

export const loginModel = async (username, password) => {
    try {

        let message = 'Login Exitoso';
        let queryUser = `SELECT * FROM tbl_users WHERE user_name=$1`;
        let valuesUser = [username]
        const userResult = await pool.query(queryUser, valuesUser);
        const id_user = userResult.rows[0]?.id


        if (userResult.rows.length === 0) {
            // throw new Error('Usuario no encontrado');
            message = "Usuario no encontrado"
            return { success: false, message }
        }

        const user = userResult.rows[0];

        // Comparar la contraseña 
        if (user.password !== password) {
            // throw new Error('Contraseña incorrecta');
            message = 'Contraseña incorrecta';
            return { success: false, message }
        }
        let queryEstablecimientos = `SELECT e.id, e.nombre, e.lat, e.lon
        FROM tbl_establecimiento e
        JOIN tbl_user_establec ue ON e.id = ue.id_establec
        WHERE ue.id_user = $1;`;

        let valuesEstablecimientos = [id_user];

        const establecimientosResult = await pool.query(queryEstablecimientos, valuesEstablecimientos);


        return {
            success: true, message, user: {
                id: userResult.rows[0].id,
                username: userResult.rows[0].user_name,
                // role: userResult.rows[0].role,
                establecimientos: establecimientosResult.rows
            }
        };
    } catch (error) {
        console.error('Error en userModel:', error.message);
        // throw error;
    }
};
