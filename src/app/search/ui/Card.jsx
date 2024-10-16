import { establecimientoAction } from "@/actions/establecimientoAction";

const Card =  ({ data }) => {
  // obtener los establelcimientos
  const establecimientos = [
    {
      id: "ALM101",
      nombre: "Larco",
      lat: "-12.121033980937588",
      lon: "-77.02875842612595",
    },
    {
      id: "ALM102",
      nombre: "Ate",
      lat: "-12.051023669713839",
      lon: "-76.95427412507735",
    },
    {
      id: "ALM103",
      nombre: "Andahuaylas",
      lat: "-12.050314868440642",
      lon: "-77.025657847027",
    },
    {
      id: "ALM104",
      nombre: "Minka",
      lat: "-12.048936592725834",
      lon: "-77.11149803870862",
    },
    {
      id: "ALM105",
      nombre: "Plaza Norte",
      lat: "-12.00076306647683",
      lon: "-77.05647351488822",
    },
    {
      id: "ALM106",
      nombre: "Jirón de la Unión",
      lat: "-12.04986980206638",
      lon: "-77.03449243187399",
    },
    {
      id: "ALM107",
      nombre: "Lurin",
      lat: "-12.276787360438414",
      lon: "-76.87241310652608",
    },
    {
      id: "ALM108",
      nombre: "San Juan de Miraflores",
      lat: "-12.14904665006113",
      lon: "-76.97144026088414",
    },
    {
      id: "ALM109",
      nombre: "Open Plaza Atocongo",
      lat: "-12.147169125518106",
      lon: "-76.98144754199859",
    },
  ];


  let nom_establ = establecimientos.find((e) => e.id === data.codBode);

  return (
    <div className="flex flex-col p-2">
      <div className="border p-2 rounded-md">
        <h3 className="font-bold">
          Establecimiento:
          <span className="font-light">
            {nom_establ ? nom_establ.nombre : "Establecimiento no encontrado"}
          </span>
        </h3>
        <p className="font-bold">
          cod: <span className="font-light">{data.itemCode}</span>
        </p>
        <p className="font-bold">
          Cantidad: <span className="font-light">{data.onHand}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
