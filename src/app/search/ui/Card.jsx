const Card = ({data}) => {
  return (
    <div className="flex flex-col p-2">
      <div  className="border p-2 rounded-md">
        <h3>{data.codBode}</h3>
        <p>{data.itemCode}</p>
        <p>{data.onHand}</p>
      </div>
    </div>
  );
};

export default Card;
