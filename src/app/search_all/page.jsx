import { HeaderSearch } from "@/components/search/header";
import { Container } from "./ui/Container";

const pageSearch = () => {
  return (
    <div className="flex flex-col p-2">
      <HeaderSearch />
      <Container />
    </div>
  );
};

export default pageSearch;