import Slider from 'react-slick';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoardingHouse } from '../../features/boardingHouse/boardingHouseSlice';
import Link from 'next/link';
import { useMemo } from 'react';
import { removeFloor, setFloor } from '../../features/floor/floorSlice';
import axios from 'axios';
import { setDataStar } from '../../features/dataSource/dataSourceSlice';
import { fetchBoardingHouseStar } from '../../features/boardingHouseStar/boardingHouseStarSlice';

const FeaturedAvgStarProperties = () => {
  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    speed: 1200,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
    ],
  };
  const dispatch = useDispatch();

  const getItem = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/customer/boardingHouse/${id}`,
      );
      dispatch(setDataStar());
      dispatch(removeFloor(0));
      dispatch(setFloor(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  const { data } = useSelector((state) => state.boardingHouseStar);
  const memoizedData = useMemo(() => data.slice(0, 12) || [], [data]);
  useEffect(() => {
    dispatch(fetchBoardingHouseStar());
  }, []);

  let content = memoizedData.slice(0, 12)?.map((item) => (
    <div className="item" key={item.id}>
      <div className="feat_property">
        <div className="thumb">
          <img className="img-whp" src={item.img} alt="fp1.jpg" />
          <div className="thmb_cntnt">
            <ul className="tag mb0">
              {item?.saleTag.map((val, i) => (
                <li className="list-inline-item" key={i}>
                  <a href="#">{val}</a>
                </li>
              ))}
            </ul>
            {/* End .tag */}

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
            {/* End .icon */}

            <Link
              onClick={() => getItem(item.id)}
              href={`/listing-details-v1/${item.id}`}
              className="fp_price"
            >
              from {item.price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              <small>/mo</small>
            </Link>
          </div>
        </div>
        {/* End .thumb */}

        <div className="details">
          <div className="tc_content">
            <p className="text-thm">{item.type}</p>
            <h4>
              <Link
                onClick={() => getItem(item.id)}
                href={`/listing-details-v1/${item.id}`}
              >
                {item.title}
              </Link>
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
        {/* End .details */}
      </div>
    </div>
  ));

  return (
    <>
      <Slider {...settings} arrows={false}>
        {content}
      </Slider>
    </>
  );
};

export default FeaturedAvgStarProperties;