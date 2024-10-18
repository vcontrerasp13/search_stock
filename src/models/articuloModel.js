import { pool } from "@/lib/db";

// export const articuloModel = async (id, description, codeBars) => {
//     try {
//         const result = await pool.query('INSERT INTO tbl_articulo (id, description, code_bars) VALUES ($1, $2, $3) RETURNING *;', [id, description, codeBars]);

//         return { success: true, data: result.rows[0] }
//     } catch (error) {
//         console.log(error);
//         return { success: false, error: "Error al insertar el artículo" };
//     }
// }

export const articuloModel = {
    get: async () => {
        try {
            const result = await pool.query('SELECT * FROM tbl_articulo');

            return { success: true, data: result.rows }
        } catch (error) {
            return { success: false, error: "Error al insertar el artículo" };
        }
    },
    insert: async (id_user, id_establec, description) => {
        try {
            const result = await pool.query('INSERT INTO tbl_searched ( id_user_establec, description) VALUES ($1, $2, $3,$4) RETURNING *;', [id_user, id_establec, description]);

            return { success: true, data: result.rows[0] }
        } catch (error) {
            console.log(error);
            return { success: false, error: "Error al insertar el artículo" };
        }
    }
}