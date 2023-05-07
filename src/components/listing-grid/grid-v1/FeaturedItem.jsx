import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLength } from '../../../features/properties/propertiesSlice';
import properties from '../../../data/properties';

const FeaturedItem = () => {
  const { isGridOrList } = useSelector((state) => state.filter);

  const dispatch = useDispatch();
  //----------------------------------------------------------------------------
  const data = useSelector((state) => state.dataSearch);
  console.log(data);
  // status handler
  let content = data.data?.slice(0, 10).map((item) => (
    <div
      className={`${
        isGridOrList ? 'col-12 feature-list' : 'col-md-6 col-lg-6'
      } `}
      key={item.id}
    >
      <div
        className={`feat_property home7 style4 ${
          isGridOrList ? 'd-flex align-items-center' : undefined
        }`}
      >
        <div className="thumb">
          <img className="img-whp" src={item.img} alt="fp1.jpg" />
          <div className="thmb_cntnt">
            <ul className="tag mb0">
              <li className="list-inline-item">
                <a href="#">Featured</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-capitalize">
                  {item.featured}
                </a>
              </li>
            </ul>
            <ul className="icon mb0">
              <li className="list-inline-item">
                <a href="#">
                  <span className="flaticon-transfer-1"></span>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <span className="flaticon-heart"></span>
                </a>
              </li>
            </ul>

            <Link href={`/listing-details-v1/${item.id}`} className="fp_price">
              ${item.price}
              <small>/mo</small>
            </Link>
          </div>
        </div>
        <div className="details">
          <div className="tc_content">
            <p className="text-thm">{item.type}</p>
            <h4>
              <Link href={`/listing-details-v1/${item.id}`}>{item.title}</Link>
            </h4>
            <p>
              <span className="flaticon-placeholder"></span>
              {item.location}
            </p>

            {/* <ul className="prop_details mb0">
              {item.itemDetails.map((val, i) => (
                <li className="list-inline-item" key={i}>
                  <a href="#">
                    {val.name}: {val.number}
                  </a>
                </li>
              ))}
            </ul> */}
          </div>
          {/* End .tc_content */}

          <div className="fp_footer">
            <ul className="fp_meta float-start mb0">
              <li className="list-inline-item">
                <Link href="/agent-v2">
                  <img src={item.posterAvatar} alt="pposter1.png" />
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="/agent-v2">{item.posterName}</Link>
              </li>
            </ul>
            <div className="fp_pdate float-end">{item.postedYear}</div>
          </div>
          {/* End .fp_footer */}
        </div>
      </div>
    </div>
  ));

  // add length of filter items
  useEffect(() => {
    dispatch(addLength(content.length));
  }, [dispatch, addLength, content]);

  return <>{content}</>;
};

export default FeaturedItem;
