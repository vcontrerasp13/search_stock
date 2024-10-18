import { HeaderSearch } from "@/components/search/header";
import { Container } from "./ui/Container";
import { NavSearch } from "./ui/NavSearch";

const pageSearch = async () => {

  return (
    <div className="flex flex-col p-2">
      <NavSearch />
      <HeaderSearch />
      <Container />
    </div>
  );
};

export default pageSearch;
