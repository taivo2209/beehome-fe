import Router from 'next/router';
import {
  addKeyword,
  addLocation,
} from '../../features/properties/propertiesSlice';
import PricingRangeSlider from './PricingRangeSlider';
import CheckBoxFilter from './CheckBoxFilter';
import GlobalSelectBox from './GlobalSelectBox';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDistrict,
  setProvince,
  setSearchText,
  setWard,
  setProvinceData,
  setWardData,
  setDistrictData,
  resetDistrict,
  resetWard,
} from '../../features/searching/searchingSlice';
import { fetchDataSearch } from '../../features/dataSearch/dataSearchSlice';
import { setDataSearch } from '../../features/dataSource/dataSourceSlice';
import useTrans from '../../pages/hooks/useTran';

const GlobalFilter = ({ className = '' }) => {
  // submit handler
  const trans = useTrans();
  const dispatch = useDispatch();

  //------------------------------------------------------------------------------

  const [dataProvince, setDataProvince] = useState({});
  const [dataDistrict, setDataDistrict] = useState({});
  const [dataWard, setDataWard] = useState({});
  const [provinceId, setProvinceId] = useState();
  const [districtId, setDistrictId] = useState();
  const [wardId, setWardId] = useState();

  const getData = async (type, parentId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/customer/province?type=${type}&parentId=${parentId}&page=1&limit=70`,
      );
      if (type === 'PROVINCE') {
        setDataProvince(res.data);
        dispatch(setProvinceData(res.data));
        dispatch(resetWard());
        dispatch(resetDistrict());
        setDistrictId('');
        setWardId('');
      } else if (type === 'DISTRICT') {
        setDataDistrict(res.data);
        dispatch(setDistrictData(res.data));
        // dispatch(setDistrict(data));
        dispatch(resetWard());
        setWardId('');
      } else if (type === 'WARD') {
        setDataWard(res.data);
        dispatch(setWardData(res.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeProvinceId = (event) => {
    setProvinceId(event.target.value);
    const data = dataProvince.items.find(
      (option) => option.id == event.target.value,
    );
    dispatch(setProvince(data));
  };
  const handleChangeDistrictId = (event) => {
    setDistrictId(event.target.value);
    const data = dataDistrict.items.find(
      (option) => option.id == event.target.value,
    );
    dispatch(setDistrict(data));
  };
  const handleChangeWardId = (event) => {
    setWardId(event.target.value);
    const data = dataWard.items.find(
      (option) => option.id == event.target.value,
    );
    dispatch(setWard(data));
  };
  const { data } = useSelector((state) => state.searching);

  const submitHandler = () => {
    Router.push('/searching-list');
    dispatch(fetchDataSearch(data));
    dispatch(setDataSearch());
  };
  return (
    <div className={`home1-advnc-search ${className}`}>
      <ul className="h1ads_1st_list mb0">
        <li className="list-inline-item">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder={trans.filter.nhap_tu_khoa}
              onChange={(e) => dispatch(setSearchText(e.target.value))}
            />
          </div>
        </li>
        {/* End li */}

        <li className="list-inline-item">
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
                className="selectpicker w100 form-select show-tick"
                data-live-search="true"
                data-width="100%"
                onClick={() => getData('PROVINCE', 1)}
                value={provinceId}
                onChange={handleChangeProvinceId}
              >
                <option value="">{trans.filter.tinh}</option>
                {dataProvince?.items?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </li>
        {/* End li */}

        {/* End li */}

        <li className="list-inline-item">
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
                className="selectpicker w100 form-select show-tick"
                data-live-search="true"
                data-width="100%"
                onClick={() => getData('DISTRICT', provinceId)}
                value={districtId}
                onChange={handleChangeDistrictId}
              >
                <option value="">{trans.filter.quan_huyen}</option>
                {dataDistrict?.items?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </li>
        {/* End li */}
        {/* End li */}

        <li className="list-inline-item">
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
                className="selectpicker w100 form-select show-tick"
                data-live-search="true"
                data-width="100%"
                value={wardId}
                onClick={() => getData('WARD', districtId)}
                onChange={handleChangeWardId}
              >
                <option value="">{trans.filter.xa_phuong}</option>
                {dataWard?.items?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </li>
        {/* End li */}
        {/* End li */}

        {/* End li */}

        {/* End li */}

        <li className="list-inline-item">
          <div className="small_dropdown2">
            <div
              id="prncgs"
              className="btn dd_btn"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <span>{trans.filter.gia}</span>
              <label htmlFor="InputEmail2">
                <span className="fa fa-angle-down"></span>
              </label>
            </div>
            <div className="dd_content2 dropdown-menu">
              <div className="pricing_acontent">
                <PricingRangeSlider />
              </div>
            </div>
          </div>
        </li>
        {/* End li */}

        <li className="list-inline-item">
          <div className="search_option_button">
            <button
              onClick={submitHandler}
              type="submit"
              className="btn btn-thm"
            >
              {trans.filter.tim_kiem}
            </button>
          </div>
        </li>
        {/* End li */}
      </ul>
    </div>
  );
};

export default GlobalFilter;
