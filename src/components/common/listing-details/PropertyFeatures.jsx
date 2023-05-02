const PropertyFeatures = ({ attributes }) => {
  return (
    <>
      {attributes?.map((val, i) => (
        <div className="col-sm-6 col-md-6 col-lg-4 " key={i}>
          <ul className="order_list list-inline-item">
            <li>
              <span className="flaticon-tick"></span>
              {val}
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default PropertyFeatures;
