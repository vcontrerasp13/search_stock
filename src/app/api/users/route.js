import { NextResponse } from "next/server";
import { loginController } from "@/controllers/userController";

export async function POST(req) {
    try {
        const { user, password } = await req.json();
        const result = await loginController(user, password);

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
