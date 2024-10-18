import { NextResponse } from "next/server";
import { articuloController } from "@/controllers/articuloController";

export async function GET() {
    try {
        const result = await articuloController.get()
        if (result.success) {
            return NextResponse.json(result, { status: 200 });
        } else {
            return NextResponse.json(result, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({
            error: error.message,
            message: "Hubo un error en la consulta"
        }, { status: 500 });
    }
}

export async function POST(req, res) {
    const { id, description, codeBars } = await req.json();

    try {
        const result = await articuloController.insert(id, description, codeBars);

        if (result.success) {
            return NextResponse.json(result, { status: 200 });
        } else {
            return NextResponse.json(result, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({
            error: error.message,
            message: "Hubo un error en la consulta"
        }, { status: 500 });
    }
}



// import { pool } from "@/lib/db";

// const BATCH_SIZE = 1000; // Cantidad máxima de artículos por lote

// export async function POST(req) {
//   try {
//     const { articulos } = await req.json();
//     console.log("Artículos recibidos:", articulos);

//     if (!articulos || !Array.isArray(articulos)) {
//       return new Response(JSON.stringify({ message: 'El array de artículos es requerido' }), { status: 400 });
//     }

//     const client = await pool.connect();

//     try {
//       console.log("Conectado a la base de datos");
//       await client.query('BEGIN');

//       // Dividimos los artículos en lotes
//       for (let i = 0; i < articulos.length; i += BATCH_SIZE) {
//         const batch = articulos.slice(i, i + BATCH_SIZE);

//         const values = batch.map((articulo, index) =>
//           `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`
//         ).join(', ');

//         const params = batch.flatMap(articulo => [
//           articulo.itemCode,
//           articulo.itemName,
//           articulo.codeBars
//         ]);

//         const query = `
//           INSERT INTO tbl_articulo (id, description, code_bars)
//           VALUES ${values}
//           RETURNING *;
//         `;

//         console.log("Valores de la consulta:", values);
//         console.log("Parámetros de la consulta:", params);

//         const result = await client.query(query, params);
//         console.log("Resultado de la inserción:", result.rows);
//       }

//       await client.query('COMMIT');

//       return new Response(JSON.stringify({ success: true, message: 'Artículos insertados correctamente' }), { status: 200 });
//     } catch (error) {
//       await client.query('ROLLBACK');
//       console.error("Error en la base de datos:", error);
//       return new Response(JSON.stringify({ success: false, error: "Error al insertar los artículos" }), { status: 500 });
//     } finally {
//       client.release();
//     }
//   } catch (error) {
//     console.error("Error en la solicitud:", error);
//     return new Response(JSON.stringify({ success: false, error: "Error al procesar la solicitud" }), { status: 500 });
//   }
// }
