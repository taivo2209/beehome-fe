const PropertyItem = ({ dataRoom }) => {
  return (
    <ul className="mb0">
      <li className="list-inline-item">
        <a href="#">Beds: {dataRoom?.roomSimple}</a>
      </li>
      <li className="list-inline-item">
        <a href="#">Baths: {dataRoom?.toilet}</a>
      </li>
      <li className="list-inline-item">
        <a href="#">Sq : {dataRoom?.acreage} </a>
      </li>
    </ul>
  );
};

export default PropertyItem;
