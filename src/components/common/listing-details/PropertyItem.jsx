import useTrans from "../../../pages/hooks/useTran";

const PropertyItem = ({ dataRoom }) => {
  const trans = useTrans();
  return (
    <ul className="mb0">
      <li className="list-inline-item">
        <a href="#">{trans.lessor.rooms.so_phong_ngu}: {dataRoom?.roomSimple}</a>
      </li>
      <li className="list-inline-item">
        <a href="#">{trans.lessor.rooms.toilet}: {dataRoom?.toilet}</a>
      </li>
      <li className="list-inline-item">
        <a href="#">{trans.lessor.rooms.dien_tich} : {dataRoom?.acreage}</a>
      </li>
    </ul>
  );
};

export default PropertyItem;
