import Link from 'next/link';
import Router from 'next/router';

import findProperties from '../../data/findProperties';
import { ImageList, ImageListItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  resetDistrict,
  resetWard,
  setDistrict,
  setDistrictData,
  setProvince,
  setProvinceData,
} from '../../features/searching/searchingSlice';
import axios from 'axios';
import {
  fetchDataSearch,
  setDataSearch,
} from '../../features/dataSearch/dataSearchSlice';
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}
const FindProperties = () => {
  const [dataDistrict, setDataDistrict] = useState({});
  const dispatch = useDispatch();
  const getData = async (type, parentId, districtId) => {
    try {
      const res1 = await axios.get(
        `http://localhost:5000/customer/province?type=PROVINCE&parentId=${1}&page=1&limit=70`,
      );
      const res = await axios.get(
        `http://localhost:5000/customer/province?type=${type}&parentId=${parentId}&page=1&limit=70`,
      );
      dispatch(setProvince(res1.data.items.find((option) => option.id == 61)));
      dispatch(setProvinceData(res1.data));
      setDataDistrict(res1.data);
      dispatch(
        setDistrict(res.data.items.find((option) => option.id == districtId)),
      );
      dispatch(setDistrictData(res.data));
      // dispatch(resetDistrict());
      let data = {
        searchText: '',
        provinceData: res1.data,
        province: res1.data.items.find((option) => option.id == 61),
        districtData: res.data,
        district: res.data.items.find((option) => option.id == districtId),
        ward: {},
        startPrice: 1000000,
        endPrice: 20000000,
        wardData: {},
      };
      dispatch(fetchDataSearch(data));
      dispatch(setDataSearch());
    } catch (err) {
      console.log(err);
    }
  };

  const { data } = useSelector((state) => state.searching);
  const search = async (id) => {
    await getData('DISTRICT', 61, id);
    Router.push('/searching-list');
    // console.log(data);
  };
  // useEffect(() => {
  //   dispatch(fetchDataSearch(data));
  // }, [dataDistrict]);
  return (
    <>
      <ImageList variant="quilted" cols={4}>
        {findProperties.slice(0, 4).map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
          >
            <div
              className="properti_city d-block"
              onClick={() => search(item.districtId)}
            >
              <div
                className="thumb"
                style={{
                  'object-fit': 'cover',
                  width: '100%',
                  height: '100%',
                  display: 'block',
                }}
              >
                <img
                  className="img-fluid w100"
                  {...srcset(item.img, 121, item.rows, item.cols)}
                  loading="lazy"
                  alt={item.title}
                />
              </div>
              <div className="overlay">
                <div className="details">
                  <h4>{item.name}</h4>
                </div>
              </div>
            </div>
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};

export default FindProperties;
