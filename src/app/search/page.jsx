import { HeaderSearch } from "@/components/search/header";
import { Container } from "./ui/Container";
import { NavSearch } from "./ui/NavSearch";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const pageSearch = async () => {
  const session = await auth();
  if (!session) {
    return redirect('/auth/signin');
  }
  return (
    <div className="flex flex-col">
      <NavSearch session={session}/>

      <HeaderSearch />
      <Container />
    </div>
  );
};

export default pageSearch;
