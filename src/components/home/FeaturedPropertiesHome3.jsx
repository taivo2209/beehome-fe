import Link from 'next/link';
import Slider from 'react-slick';
import properties from '../../data/properties';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { fetchBoardingHouse } from '../../features/boardingHouse/boardingHouseSlice';
import { setDataBoardingHouse } from '../../features/dataSource/dataSourceSlice';
import { removeFloor, setFloor } from '../../features/floor/floorSlice';
import { Button, Tooltip } from '@mui/material';
import useTrans from '../../pages/hooks/useTran';

const FeaturedPropertiesHome3 = () => {
  const settings = {
    dots: false,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: false,
    speed: 1200,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 520,
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
      dispatch(setDataBoardingHouse());
      dispatch(removeFloor(0));
      dispatch(setFloor(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  const { data } = useSelector((state) => state.boardingHouses);
  const memoizedData = useMemo(() => data.slice(0, 12) || [], [data]);
  useEffect(() => {
    dispatch(fetchBoardingHouse());
  }, []);
  const trans = useTrans();

  return (
    <>
      <Slider {...settings} arrows={true}>
        {memoizedData.slice(0, 12)?.map((item) => (
          <div className="item" key={item?.id}>
            <div className="feat_property home3">
              <div className="thumb">
                <img className="img-whp" src={item?.img} alt="fp1.jpg" />
                <div className="thmb_cntnt">
                  <Link
                    onClick={() => getItem(item?.id)}
                    href={`/house-details/${item?.id}`}
                  >
                    <div className="fp_price">
                      {trans.from}{' '}
                      {item?.price?.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      <small>{trans.detail.gia_thang}</small>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="details">
                <div className="tc_content">
                  <p className="text-thm">{item?.type}</p>
                  <h4>
                    <Link
                      onClick={() => getItem(item?.id)}
                      href={`/house-details/${item?.id}`}
                    >
                      <Tooltip title={item?.title} placement="bottom">
                        <div>{item?.title}</div>
                      </Tooltip>
                    </Link>
                  </h4>
                  <p>
                    <span className="flaticon-placeholder"></span>
                    {item?.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default FeaturedPropertiesHome3;
