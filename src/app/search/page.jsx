import { HeaderSearch } from "@/components/search/header";
import { Container } from "./ui/Container";
// import { establecimientoAction } from "@/actions/establecimientoAction";

const pageSearch = async () => {
  // const establecimientos = await establecimientoAction();

  return (
    <div className="flex flex-col p-2">
      <HeaderSearch />
      <Container />
    </div>
  );
};

export default pageSearch;
