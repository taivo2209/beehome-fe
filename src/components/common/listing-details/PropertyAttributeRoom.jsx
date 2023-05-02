import { useState } from 'react';

const PropertyAttribute = (dataRoom) => {
  return (
    <>
      {dataRoom.attributes.roomToAttributes.map((val, i) => (
        <div className="col-sm-6 col-md-6 col-lg-4 " key={i}>
          <ul className="order_list list-inline-item">
            <li>
              <span className="flaticon-tick"></span>
              {val.roomAttributeTerm.roomAttributeTermDetails[0].name}
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default PropertyAttribute;
