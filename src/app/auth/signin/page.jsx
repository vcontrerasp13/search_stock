import LoginForm from "@/app/login/ui/LoginForm";
import { auth } from "@/auth.js";
// import { LoginForm } from "./ui/LoginForm.jsx";
import { redirect } from "next/navigation.js";

export default async function LoginPage() {
    const session = await auth();
    if (session) {
        return redirect('/')
    }

    return (
        <div className="flex flex-col min-h-screen pt-24 sm:pt-24">
            {/* <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1> */}
            {/* <h1 className={` text-4xl mb-5`}>Ingresar</h1> */}

            {/* <LoginForm /> */}
            <LoginForm />

        </div>
    );
}
