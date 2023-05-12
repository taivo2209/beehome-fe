import { useEffect, useState } from 'react';
import CheckBoxFilter from './CheckBoxFilter';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import PropertyMediaUploader from '../PropertyMediaUploader';

const CreateList = () => {
  const router = useRouter();
  const [dataProvince, setDataProvince] = useState({});
  const [dataDistrict, setDataDistrict] = useState({});
  const [dataWard, setDataWard] = useState({});
  const [provinceId, setProvinceId] = useState();
  const [districtId, setDistrictId] = useState();
  const [wardId, setWardId] = useState();
  const [name, setName] = useState('');
  const [type, setType] = useState('SINGLE_ROOM');
  const [contentRuleVN, setContentRuleVN] = useState('');
  const [contentRuleEN, setContentRuleEN] = useState('');
  const [contentDepositVN, setContentDepositVN] = useState('');
  const [contentDepositEN, setContentDepositEN] = useState('');
  const [contentDescriptionVN, setContentDescriptionVN] = useState('');
  const [contentDescriptionEN, setContentDescriptionEN] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [floor, setFloor] = useState(0);
  const [electricFee, setElectricFee] = useState('');
  const [waterFee, setWaterFee] = useState('');
  const [serviceFee, setServiceFee] = useState('');
  const [tagIds, setTagIds] = useState([]);
  const [imgIds, setImgIds] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleBack = () => {
    router.push('/my-houses');
  };

  const validateInputs = () => {
    if (
      !name ||
      !contentRuleVN ||
      !contentRuleEN ||
      !contentDepositVN ||
      !contentDepositEN ||
      !contentDescriptionVN ||
      !contentDescriptionEN ||
      !address ||
      !province ||
      !district ||
      !ward ||
      !floor ||
      !electricFee ||
      !waterFee ||
      !serviceFee
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng điền đầy đủ thông tin',
      });
      return false;
    }
    if (
      isNaN(Number(electricFee)) ||
      isNaN(Number(waterFee)) ||
      isNaN(Number(serviceFee))
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng điền thông tin hợp lệ',
        text: 'Vui lòng nhập số ở ElectricFee, WaterFee, ServiceFee',
      });
      return false;
    }
    if (
      Number(electricFee) < 0 ||
      Number(waterFee) < 0 ||
      Number(serviceFee) < 0
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng điền thông tin hợp lệ',
        text: 'Vui lòng không nhập số âm ở ElectricFee, WaterFee, ServiceFee',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateInputs();

    const formData = {
      name: name,
      tagIds: tagIds,
      floor: floor,
      imgIds: imgIds,
      electricFee: electricFee,
      waterFee: waterFee,
      serviceFee: serviceFee,
      type: type,
      houseRentDeposits: [
        {
          content: contentDepositVN,
          lang: 'VN',
        },
        {
          content: contentDepositEN,
          lang: 'EN',
        },
      ],
      houseDescriptions: [
        {
          content: contentDescriptionVN,
          lang: 'VN',
        },
        {
          content: contentDescriptionEN,
          lang: 'EN',
        },
      ],
      boardingHouseRules: [
        {
          content: contentRuleVN,
          lang: 'VN',
        },
        {
          content: contentRuleEN,
          lang: 'EN',
        },
      ],
      address: {
        address: address,
        province: province,
        ward: ward,
        district: district,
      },
    };
    if (isValid) {
      try {
        axios.post('http://localhost:5000/lessor/boardingHouse', formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        Swal.fire({
          icon: 'success',
          title: 'Tạo thành công!',
          showConfirmButton: false,
          timer: 1500,
        });
        router.push('/my-houses');
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Đã xảy ra lỗi!',
          text: 'Vui lòng thử lại sau.',
          confirmButtonText: 'OK',
        });
        console.log(error);
      }
    }
    // console.log(formData);
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
    // console.log('setProvinceId', data,event.target.value);
    setProvince(data.name);
  };
  const handleChangeDistrictId = (event) => {
    setDistrictId(event.target.value);
    const data = dataDistrict.items.find(
      (option) => option.id == event.target.value,
    );
    setDistrict(data.name);
    // console.log('setDistrictId', data,event.target.value);
  };

  const handleChangeWardId = (event) => {
    setWardId(event.target.value);
    const data = dataWard.items.find(
      (option) => option.id == event.target.value,
    );
    setWard(data.name);
    // console.log('setWardId', data,event.target.value);
  };

  const handleSelectionChange = async (selections) => {
    setTagIds(selections);
  };
  const handleUpload = (newImages) => {
    setImgIds(newImages);
  };

  useEffect(() => {}, [tagIds]);
  // console.log(tagIds);
  return (
    <>
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Property Title</label>
          <input
            type="text"
            className="form-control"
            id="propertyTitle"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Type</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            onChange={(e) => setType(e.target.value)}
          >
            <option disabled>Select</option>
            <option value="SINGLE_ROOM">SINGLE-ROOM</option>
            <option value="MULTIPLE_ROOM">MULTIPLE-ROOM</option>
          </select>
        </div>
      </div>

      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExamplePrice">Floor Number</label>
          <input
            type="number"
            required
            className="form-control"
            id="formGroupExamplePrice"
            onChange={(e) => setFloor(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Electric Fee (/1kWh)</label>
          <input
            type="text"
            required
            className="form-control"
            id="propertyTitle"
            onChange={(e) => setElectricFee(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Water Fee (/person)</label>
          <input
            type="text"
            className="form-control"
            id="propertyTitle"
            onChange={(e) => setWaterFee(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Service Fee</label>
          <input
            type="text"
            required
            className="form-control"
            id="propertyTitle"
            onChange={(e) => setServiceFee(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="propertyDescription">Rule VN</label>
          <textarea
            className="form-control"
            required
            id="propertyDescription"
            rows="7"
            onChange={(e) => setContentRuleVN(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="propertyDescription">Rule EN</label>
          <textarea
            className="form-control"
            required
            id="propertyDescription"
            rows="7"
            onChange={(e) => setContentRuleEN(e.target.value)}
          ></textarea>
        </div>
      </div>
      {/* End .col */}
      <div className="col-lg-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="propertyDescription">Rent Deposit VN</label>
          <textarea
            className="form-control"
            required
            id="propertyDescription"
            rows="7"
            onChange={(e) => setContentDepositVN(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="propertyDescription">Rent Deposit EN</label>
          <textarea
            className="form-control"
            required
            id="propertyDescription"
            rows="7"
            onChange={(e) => setContentDepositEN(e.target.value)}
          ></textarea>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="propertyDescription">Description VN</label>
          <textarea
            className="form-control"
            required
            id="propertyDescription"
            rows="7"
            onChange={(e) => setContentDescriptionVN(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="propertyDescription">Description EN</label>
          <textarea
            className="form-control"
            required
            id="propertyDescription"
            rows="7"
            onChange={(e) => setContentDescriptionEN(e.target.value)}
          ></textarea>
        </div>
      </div>
      {/* End .col */}

      <div className="col-xl-12">
        <h4 className="mb10">Tag</h4>
      </div>
      <CheckBoxFilter onSelectionChange={handleSelectionChange} />
      <div className="col-xl-12">
        <h4 className="mb10">Images</h4>
      </div>
      <PropertyMediaUploader onUpload={handleUpload} />
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyAddress">Address</label>
          <input
            type="text"
            required
            className="form-control"
            id="propertyAddress"
            onChange={(e) => setAddress(e.target.value)}
          />
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
            onClick={() => getData('PROVINCE', 1)}
            value={provinceId}
            onChange={handleChangeProvinceId}
          >
            <option disabled>Select</option>
            {dataProvince?.items?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
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
            onClick={() => getData('DISTRICT', provinceId)}
            value={districtId}
            onChange={handleChangeDistrictId}
          >
            <option defaultValue={true} disabled>
              Select
            </option>
            {dataDistrict?.items?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
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
            value={wardId}
            onClick={() => getData('WARD', districtId)}
            onChange={handleChangeWardId}
          >
            <option disabled>Select</option>
            {dataWard?.items?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* End .col */}
      <div className="col-xl-12">
        <div className="my_profile_setting_input overflow-hidden mt20">
          <button className="btn btn2 float-end" onClick={handleSubmit}>
            Create
          </button>
          <button className="btn btn1 float-start" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateList;
