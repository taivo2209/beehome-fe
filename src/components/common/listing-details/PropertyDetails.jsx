import useTrans from "../../../pages/hooks/useTran";

const PropertyDetails = ({ dataDetail }) => {
  const trans = useTrans()
  return (
    <>
      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              {trans.lessor.houses.dien} : <span>{dataDetail?.electricFee}đ</span>
            </p>
          </li>
        </ul>
      </div>
      {/* End .col */}

      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
            {trans.lessor.houses.nuoc} : <span>{dataDetail?.waterFee}đ</span>
            </p>
          </li>
        </ul>
      </div>
      {/* End .col */}

      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
            {trans.lessor.houses.dich_vu} : <span>{dataDetail?.serviceFee}đ</span>
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PropertyDetails;
