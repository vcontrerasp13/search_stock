import { NextResponse } from "next/server";

import { establecimientoController } from "@/controllers/establecimientoController";

export async function GET() {
    try {
        const result = await establecimientoController();

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
