import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDistrict,
  setProvince,
  setWard,
  resetWard,
  resetDistrict,
  setSearchText,
} from '../../../features/searching/searchingSlice';
import PricingRangeSlider from '../PricingRangeSlider';
import axios from 'axios';
import { fetchDataSearch } from '../../../features/dataSearch/dataSearchSlice';
import useTrans from '../../../pages/hooks/useTran';

const FilteringItem = () => {
  const { data } = useSelector((state) => state.searching);
  const dispatch = useDispatch();
  const trans = useTrans();

  const { keyword, propertyType } = useSelector((state) => state.properties);
  // input state
  const [getKeyword, setKeyword] = useState(keyword);
  const [getPropertiesType, setPropertiesType] = useState(propertyType);

  const clearHandler = () => {
    clearAllFilters();
  };

  //------------------------------------------------------------------------------

  const [dataProvince, setDataProvince] = useState(data.provinceData);
  const [dataDistrict, setDataDistrict] = useState(data.districtData);
  const [dataWard, setDataWard] = useState(data.wardData);
  const [provinceId, setProvinceId] = useState(data.province?.id);
  const [districtId, setDistrictId] = useState(data.district?.id);
  const [wardId, setWardId] = useState(data.ward?.id);
  const clearAllFilters = () => {
    dispatch(fetchDataSearch(data));
  };
  const getData = async (type, parentId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/customer/province?type=${type}&parentId=${parentId}&page=1&limit=70`,
      );
      if (type === 'PROVINCE') {
        setDataProvince(res.data);
        // console.log('data province', dataProvince, parentDistrict);
      } else if (type === 'DISTRICT') {
        setDataDistrict(res.data);
        // console.log('data district', dataDistrict, parentWard);
      } else if (type === 'WARD') {
        setDataWard(res.data);
        // console.log('data ward', dataWard);
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
    dispatch(resetWard());
    dispatch(resetDistrict());
    setDistrictId('');
    setWardId('');
  };
  const handleChangeDistrictId = (event) => {
    setDistrictId(event.target.value);
    const data = dataDistrict.items.find(
      (option) => option.id == event.target.value,
    );
    dispatch(setDistrict(data));
    dispatch(resetWard());
    setWardId('');
  };
  const handleChangeWardId = (event) => {
    setWardId(event.target.value);
    const data = dataWard.items.find(
      (option) => option.id == event.target.value,
    );
    dispatch(setWard(data));
  };
  // console.log(data.district.district.id);
  return (
    <ul className="sasw_list mb0">
      <li className="search_area">
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={trans.filter.nhap_tu_khoa}
            value={data?.searchText}
            onChange={(e) => dispatch(setSearchText(e.target.value))}
          />
          <label>
            <span className="flaticon-magnifying-glass"></span>
          </label>
        </div>
      </li>
      {/* End li */}
      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              className="selectpicker w100 show-tick form-select"
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
      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              className="selectpicker w100 show-tick form-select"
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
      {/* End li */}{' '}
      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              className="selectpicker w100 show-tick form-select"
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
      <li>
        <div className="small_dropdown2">
          <div
            id="prncgs2"
            className="btn dd_btn"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            <span>{trans.filter.gia}</span>
            <label htmlFor="prncgs2">
              <span className="fa fa-angle-down"></span>
            </label>
          </div>
          <div className="dd_content2 style2 dropdown-menu">
            <div className="pricing_acontent ">
              <PricingRangeSlider />
            </div>
          </div>
        </div>
      </li>
      {/* End li */}
      <li>
        <div className="search_option_button">
          <button
            onClick={clearHandler}
            type="button"
            className="btn btn-block btn-thm w-100"
          >
            {trans.filter.tim_kiem}
          </button>
        </div>
      </li>
      {/* End li */}
    </ul>
  );
};

export default FilteringItem;
