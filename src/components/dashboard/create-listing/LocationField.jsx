import axios from "axios";
import { useEffect, useState } from "react";

const LocationField = () => {
const [dataProvince, setDataProvince] = useState({});
const [dataDistrict, setDataDistrict] = useState({});
const [dataWard, setDataWard] = useState({});
const [parentProvince, setParentProvince] = useState();
const [parentDistrict, setParentDistrict] = useState();
const [parentWard, setParentWard] = useState();

const getData = async (type, parentId) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/customer/province?type=${type}&parentId=${parentId}&page=1&limit=20`
    );
    if (type === "PROVINCE") {
      setDataProvince(res.data);
      console.log("data province", dataProvince,parentDistrict);
    } else if (type === "DISTRICT") {
      setDataDistrict(res.data);
      console.log("data district", dataDistrict,parentWard);
    } else if (type === "WARD") {
      setDataWard(res.data);
      console.log("data ward", dataWard);
    }
  } catch (err) {
    console.log(err);
  }
};

  const handleChangeDistrict = (event) => {
    setParentDistrict(event.target.value);
  };
    const handleChangeWard = (event) => {
    setParentWard(event.target.value);
  };
  //      useEffect(() => {
  //   getData();
  // }, []);
  return (
    <>
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyAddress">Address</label>
          <input type="text" className="form-control" id="propertyAddress" />
        </div>
      </div>

      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Province</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            onClick={()=>getData("PROVINCE",1)}
             value={parentDistrict}
             onChange={handleChangeDistrict}
          >
              {dataProvince?.items?.map(item => (
                <option key={item.id} value={item.id} >{item.name}</option>
              ))}
          </select>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>District</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            onClick={()=>getData("DISTRICT",parentDistrict)}
             value={parentWard}
             onChange={handleChangeWard}
          >
          {dataDistrict?.items?.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
          </select>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Ward</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
             onClick={()=>getData("WARD",parentWard)}
          >
             {dataWard?.items?.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
          </select>
        </div>
      </div>
      {/* End .col */}
      <div className="col-xl-12">
        <div className="my_profile_setting_input overflow-hidden mt20">
          <button className="btn btn1 float-start">Back</button>
          <button className="btn btn2 float-end">Next</button>
        </div>
      </div>
      {/* End .col */}
    </>
  );
};

export default LocationField;
