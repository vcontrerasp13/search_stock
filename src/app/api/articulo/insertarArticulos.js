// pages/api/insertArticulos.js
import { pool } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido, solo POST es aceptado' });
  }

  const { articulos } = req.body;

  if (!articulos || articulos.length === 0) {
    return res.status(400).json({ message: 'El array de artículos es requerido' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Crear la consulta de inserción múltiple
    const values = articulos.map((articulo, index) =>
      `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`
    ).join(', ');

    const params = articulos.flatMap(articulo => [
      articulo.itemCode,
      articulo.itemName,
      articulo.codeBars
    ]);

    const query = `
      INSERT INTO tbl_articulo (id, description, code_bars)
      VALUES ${values}
      RETURNING *;
    `;

    const result = await client.query(query, params);
    await client.query('COMMIT');

    return res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    return res.status(500).json({ success: false, error: "Error al insertar los artículos" });
  } finally {
    client.release();
  }
}
