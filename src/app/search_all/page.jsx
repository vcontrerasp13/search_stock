import { HeaderSearch } from "@/components/search/header";
import { Container } from "./ui/Container";
import { NavSearch } from "../search/ui/NavSearch";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const pageSearchAll = async () => {
  const session = await auth();
  if (!session) {
    return redirect('/auth/signin');
  }
  return (
    <div className="flex flex-col">
      <NavSearch session={session} />
      <HeaderSearch />
      <Container />
    </div>
  );
};

export default pageSearchAll;
