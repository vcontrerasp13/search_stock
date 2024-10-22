import { pool } from '@/lib/db';

// export const loginModel = async (username, password) => {
//     try {

//         let message = 'Login Exitoso';
//         // let queryUser = `SELECT * FROM tbl_users WHERE user_name=$1`;
//         let queryUser = `SELECT u.id as id_user, u.user_name as username,u.password,e.id as id_establec_current, e.nombre as establec_current,e.lat,e.lon,r.id as id_rol,r.nombre as rol FROM tbl_users u

//                         INNER JOIN tbl_establecimiento e ON u.id_establec_current=e.id
//                         INNER JOIN tbl_role r ON u.id_rol=r.id
//                         WHERE u.user_name=$1`;
//         let valuesUser = [username]
//         const userResult = await pool.query(queryUser, valuesUser);

//         if (userResult.rows.length === 0) {
//             // throw new Error('Usuario no encontrado');
//             message = "Usuario no encontrado"
//             return { success: false, message }
//         }

//         const user = userResult.rows[0];
//         const id_user = user.id_user

//         // Comparar la contraseña 
//         if (user.password !== password) {
//             // throw new Error('Contraseña incorrecta');
//             message = 'Contraseña incorrecta';
//             return { success: false, message }
//         }

//         let queryEstablecimientos = `SELECT e.id, e.nombre, e.lat, e.lon
//         FROM tbl_establecimiento e
//         JOIN tbl_user_establec ue ON e.id = ue.id_establec
//         WHERE ue.id_user = $1;`;

//         let valuesEstablecimientos = [id_user];

//         const establecimientosResult = await pool.query(queryEstablecimientos, valuesEstablecimientos);


//         return {
//             success: true,
//             message,
//             user: user,
//             establec_access: establecimientosResult.rows
//         };
//     } catch (error) {
//         console.error('Error en userModel:', error.message);
//         // throw error;
//     }
// };


export const userModel = {
    update: async (establecimiento, id_user) => {
        try {
            let query = "UPDATE tbl_users SET id_establec_current=$1 WHERE id=$2";
            let values = [establecimiento, id_user]
            await pool.query(query, values)

            return { success: true, error: "Establecimiento Actualizado" };
        } catch (error) {
            console.error('Error en userModel:', error.message);
            return { success: false, error: "Error al insertar el artículo" };
        }
    },
    getOne: async (id_user) => {
        try {
            let query = `SELECT u.id as id_user, u.user_name as username,u.password,e.id as id_establec_current, e.nombre as establec_current,e.lat,e.lon,r.id as id_rol,r.nombre as rol FROM tbl_users u
                        INNER JOIN tbl_establecimiento e ON u.id_establec_current=e.id
                        INNER JOIN tbl_role r ON u.id_rol=r.id
                        WHERE u.id=$1`;
            const values = [id_user]
            const userResult = await pool.query(query, values);

            // get establecimientos

            let queryEstablecimientos = `SELECT e.id, e.nombre, e.lat, e.lon
                FROM tbl_establecimiento e
                JOIN tbl_user_establec ue ON e.id = ue.id_establec
                WHERE ue.id_user = $1;`;

            let valuesEstablecimientos = [id_user];

            const establecimientosResult = await pool.query(queryEstablecimientos, valuesEstablecimientos);
            const user = userResult.rows[0];

            return {
                success: true,
                message: 'Usuario obtenido',
                user: userResult.rows[0],
                establec_access: establecimientosResult.rows
            }
        } catch (error) {
            console.log(error)
        }
    },
    login: async (username, password) => {
        try {

            let message = 'Login Exitoso';
            // let queryUser = `SELECT * FROM tbl_users WHERE user_name=$1`;
            let queryUser = `SELECT u.id as id_user, u.user_name as username,u.password,e.id as id_establec_current, e.nombre as establec_current,e.lat,e.lon,r.id as id_rol,r.nombre as rol FROM tbl_users u
    
                            INNER JOIN tbl_establecimiento e ON u.id_establec_current=e.id
                            INNER JOIN tbl_role r ON u.id_rol=r.id
                            WHERE u.user_name=$1`;
            let valuesUser = [username]
            const userResult = await pool.query(queryUser, valuesUser);

            if (userResult.rows.length === 0) {
                // throw new Error('Usuario no encontrado');
                message = "Usuario no encontrado"
                return { success: false, message }
            }

            const user = userResult.rows[0];
            const id_user = user.id_user

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
                success: true,
                message,
                user: user,
                establec_access: establecimientosResult.rows
            };
        } catch (error) {
            console.error('Error en userModel:', error.message);
            // throw error;
        }
    }
}