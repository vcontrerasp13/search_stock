import { auth } from "@/auth";
import { NavSearch } from "../search/ui/NavSearch";
import { Container } from "./ui/Container";
import { redirect } from "next/navigation";

const pageEstablecimientos = async () => {
  const session = await auth();
  if (!session) {
    return redirect('/auth/signin');
  }

  return (
    <div className="flex flex-col gap-2">
      <NavSearch session={session} />
  
      <Container />
    </div >
  );
};

export default pageEstablecimientos; //
