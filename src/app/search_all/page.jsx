import { HeaderSearch } from "@/components/search/header";
import { Container } from "./ui/Container";
import { NavSearch } from "../search/ui/NavSearch";

const pageSearchAll = async () => {
  return (
    <div className="flex flex-col p-2">
      <NavSearch />
      <HeaderSearch />
      <Container />
    </div>
  );
};

export default pageSearchAll;
