import { NextResponse } from "next/server";
import { searchedController } from "@/controllers/searchedController";

export async function POST(req) {
    try {
        const { id_user_establec, description } = await req.json();
        const result = await searchedController.insert(id_user_establec, description);

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
