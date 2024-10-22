import { NextResponse } from "next/server";
import { loginController, userController } from "@/controllers/userController";

export async function GET(req) {
    try {

        const { searchParams } = req.nextUrl;
        const id = searchParams.get('id');

        const result = await userController.getOne(id);

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

export async function POST(req) {
    try {

        const { username, password } = await req.json();

        const result = await userController.login(username, password);

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


export async function PUT(req) {

    try {
        const { establecimiento, id_user } = await req.json();

        const result = await userController.update(establecimiento, id_user);
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