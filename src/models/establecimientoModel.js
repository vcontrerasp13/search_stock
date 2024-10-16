import { pool } from "@/lib/db";

export const establecimientoModel = async () => {
    try {

        const result = await pool.query('Select * from tbl_establecimiento');

        return { success: true, data: result.rows }
    } catch (error) {
        console.log(error);
    }
}