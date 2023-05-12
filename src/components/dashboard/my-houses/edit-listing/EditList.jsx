import { useEffect, useState } from 'react';
import CheckBoxFilter from './CheckBoxFilter';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import PropertyMediaUploader from '../PropertyMediaUploader';

const EditList = () => {
  const router = useRouter();
  const { id } = router.query;
  const [housesData, setHousesData] = useState({});
  const [dataProvince, setDataProvince] = useState({});
  const [dataDistrict, setDataDistrict] = useState({});
  const [dataWard, setDataWard] = useState({});
  const [provinceId, setProvinceId] = useState();
  const [districtId, setDistrictId] = useState();
  const [wardId, setWardId] = useState();
  const [name, setName] = useState('');
  const [status, setStatus] = useState('ACTIVE');
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
  const [tagIds, setTagIds] = useState([]);
  const [imgIds, setImgIds] = useState([]);
  const [electricFee, setElectricFee] = useState('');
  const [waterFee, setWaterFee] = useState('');
  const [serviceFee, setServiceFee] = useState('');
  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleBack = () => {
    router.push('/my-houses');
  };

  const getDataHouses = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/lessor/boardingHouse/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setHousesData(res.data);
      setName(res.data?.name);
      setContentRuleVN(res.data?.boardingHouseRules?.[0]?.content);
      setContentRuleEN(res.data?.boardingHouseRules?.[1]?.content);
      setContentDepositVN(res.data?.boardingHouseRentDeposits?.[0]?.content);
      setContentDepositEN(res.data?.boardingHouseRentDeposits?.[1]?.content);
      setContentDescriptionVN(res.data?.boardingHouseDescriptions?.[0]?.content);
      setContentDescriptionEN(res.data?.boardingHouseDescriptions?.[1]?.content);
      setAddress(res.data?.boardingHouseAddress?.address);
      setElectricFee(res.data?.electricFee);
      setWaterFee(res.data?.waterFee);
      setServiceFee(res.data?.serviceFee);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataHouses();
  }, []);

  const handleSubmit = (e) => {
    const formData = {
      id: id,
      name: name,
      status: status,
      tagIds: tagIds,
      imgIds: imgIds,
      electricFee: electricFee,
      waterFee: waterFee,
      serviceFee: serviceFee,
      type: type,
      houseRentDeposits: [
        {
          id: housesData?.boardingHouseRentDeposits?.[0]?.id,
          content: contentDepositVN,
          lang: 'VN',
        },
        {
          id: housesData?.boardingHouseRentDeposits?.[1]?.id,
          content: contentDepositEN,
          lang: 'EN',
        },
      ],
      houseDescriptions: [
        {
          id: housesData?.boardingHouseDescriptions?.[0]?.id,
          content: contentDescriptionVN,
          lang: 'VN',
        },
        {
          id: housesData?.boardingHouseDescriptions?.[1]?.id,
          content: contentDescriptionEN,
          lang: 'EN',
        },
      ],
      boardingHouseRules: [
        {
          id: housesData?.boardingHouseRules?.[0]?.id,
          content: contentRuleVN,
          lang: 'VN',
        },
        {
          id: housesData?.boardingHouseRules?.[1]?.id,
          content: contentRuleEN,
          lang: 'EN',
        },
      ],
      address: {
        id: housesData?.boardingHouseAddress?.id,
        address: address,
        province: province,
        ward: ward,
        district: district,
      },
    };
    e.preventDefault();
    try {
      axios
        .patch('http://localhost:5000/lessor/boardingHouse', formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          Swal.fire({
            title: 'Thành công!',
            text: 'Edit Success!',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            router.push('/my-houses');
          });
        });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Đã xảy ra lỗi!',
        text: 'Vui lòng thử lại sau.',
        confirmButtonText: 'OK',
      });
      console.log(err);
    }
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

  // const getDataProvince = async (type, parentId) => {
  //   try {
  //     let res = await axios.get(
  //       `http://localhost:5000/customer/province?type=PROVINCE&parentId=1&page=1&limit=70`,
  //     );

  //     const province = res?.data?.items.filter(
  //       (item) => item.name == housesData?.boardingHouseAddress?.province,
  //     );
  //     if (province[0]?.id) {
  //       let res1 = await axios.get(
  //         `http://localhost:5000/customer/province?type=DISTRICT&parentId=${province[0]?.id}&page=1&limit=70`,
  //       );

  //       const district = res1?.data?.items.filter(
  //         (item) => item.name == housesData?.boardingHouseAddress?.district,
  //       );
  //     }
  //     if (district[0]?.id) {
  //       let res2 = await axios.get(
  //         `http://localhost:5000/customer/province?type=WARD&parentId=${district[0]?.id}&page=1&limit=70`,
  //       );

  //       const ward = res2?.data?.items.filter(
  //         (item) => item.name == housesData?.boardingHouseAddress?.ward,
  //       );
  //     }
  //     setDataProvince(res?.data);
  //     setProvinceId(province[0]?.id);
  //     setDataDistrict(res1?.data);
  //     setDistrictId(district[0]?.id);
  //     setDataWard(res2?.data);
  //     setWardId(ward[0]?.id);

  //     // setDataProvince(res.data);
  //     console.log(
  //       'data province',
  //       province[0]?.id,

  //       district[0]?.id,
  //       ward[0]?.id,
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const getDataProvince = async (type, parentId) => {
    try {
      let res = await axios.get(
        `http://localhost:5000/customer/province?type=PROVINCE&searchText=${boardingHouseAddress?.province}&page=1&limit=70`,
      );
      let res1 = await axios.get(
        `http://localhost:5000/customer/province?type=DISTRICT&searchText=${boardingHouseAddress?.district}&page=1&limit=70`,
      );
      let res2 = await axios.get(
        `http://localhost:5000/customer/province?type=WARD&searchText=${boardingHouseAddress?.ward}&page=1&limit=70`,
      );

      // const province = res?.data?.items.filter(
      //   (item) => item.name == housesData?.boardingHouseAddress?.province,
      // );
      // const district = res1?.data?.items.filter(
      //   (item) => item.name == housesData?.boardingHouseAddress?.district,
      // );
      // const ward = res2?.data?.items.filter(
      //   (item) => item.name == housesData?.boardingHouseAddress?.ward,
      // );

      // setDataProvince(res?.data);
      // setProvinceId(province[0]?.id);
      // setDataDistrict(res1?.data);
      // setDistrictId(district[0]?.id);
      // setDataWard(res2?.data);
      // setWardId(ward[0]?.id);

      console.log(
        'data province',
        res,
        res1,
        res2,
        // province[0]?.id,
        // district[0]?.id,
        // ward[0]?.id,
      );
    } catch (err) {
      console.log(err);
    }
  };
  // const getDataProvince = async (type, parentId) => {
  //   try {
  //     let res = await axios.get(
  //       `http://localhost:5000/customer/province?type=PROVINCE&parentId=1&page=1&limit=70`,
  //     );

  //     if (res?.data?.items) {
  //       const province = res?.data?.items.filter(
  //         (item) => item.name == housesData?.boardingHouseAddress?.province,
  //       );
  //       if (province[0]?.id) {
  //         let res1 = await axios.get(
  //           `http://localhost:5000/customer/province?type=DISTRICT&parentId=${province[0]?.id}&page=1&limit=70`,
  //         );
  //         if (res1?.data?.items) {
  //           const district = res1?.data?.items.filter(
  //             (item) => item.name == housesData?.boardingHouseAddress?.district,
  //           );
  //           if (district[0]?.id) {
  //             let res2 = await axios.get(
  //               `http://localhost:5000/customer/province?type=WARD&parentId=${district[0]?.id}&page=1&limit=70`,
  //             );
  //             if (res2?.data?.items) {
  //               const ward = res2?.data?.items.filter(
  //                 (item) => item.name == housesData?.boardingHouseAddress?.ward,
  //               );
  //               setDataWard(res2?.data);
  //               setWardId(ward[0]?.id);
  //             }
  //           }
  //           setDataDistrict(res1?.data);
  //           setDistrictId(district[0]?.id);
  //         }
  //       }
  //       setDataProvince(res?.data);
  //       setProvinceId(province[0]?.id);
  //       console.log(
  //         'data province',
  //         province[0]?.id,
  //         district[0]?.id,
  //         ward[0]?.id,
  //       );
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // console.log(
  //   'duy nè',
  //   dataProvince,
  //   dataDistrict,
  //   dataWard,
  //   provinceId,
  //   districtId,
  //   wardId,
  // );
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
  useEffect(() => {
    getDataProvince();
  }, []);
  console.log(
    'duy nè',
    dataProvince,
    dataDistrict,
    dataWard,
    provinceId,
    districtId,
    wardId,
  );
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
            defaultValue={housesData?.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Status</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option disabled>Select</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
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
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Electric Fee</label>
          <input
            type="text"
            className="form-control"
            id="propertyTitle"
            defaultValue={housesData?.electricFee}
            onChange={(e) => setElectricFee(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Water Fee</label>
          <input
            type="text"
            className="form-control"
            id="propertyTitle"
            defaultValue={housesData?.waterFee}
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
            className="form-control"
            id="propertyTitle"
            defaultValue={housesData?.serviceFee}
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
            id="propertyDescription"
            rows="7"
            defaultValue={housesData?.boardingHouseRules?.[0]?.content}
            onChange={(e) => setContentRuleVN(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="propertyDescription">Rule EN</label>
          <textarea
            className="form-control"
            id="propertyDescription"
            rows="7"
            defaultValue={housesData?.boardingHouseRules?.[1]?.content}
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
            id="propertyDescription"
            rows="7"
            defaultValue={housesData?.boardingHouseRentDeposits?.[0]?.content}
            onChange={(e) => setContentDepositVN(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="propertyDescription">Rent Deposit EN</label>
          <textarea
            className="form-control"
            id="propertyDescription"
            rows="7"
            defaultValue={housesData?.boardingHouseRentDeposits?.[1]?.content}
            onChange={(e) => setContentDepositEN(e.target.value)}
          ></textarea>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="propertyDescription">Rent Deposit VN</label>
          <textarea
            className="form-control"
            id="propertyDescription"
            rows="7"
            defaultValue={housesData?.boardingHouseDescriptions?.[0]?.content}
            onChange={(e) => setContentDescriptionVN(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="propertyDescription">Rent Deposit EN</label>
          <textarea
            className="form-control"
            id="propertyDescription"
            rows="7"
            defaultValue={housesData?.boardingHouseDescriptions?.[0]?.content}
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
            className="form-control"
            id="propertyAddress"
            defaultValue={housesData?.boardingHouseAddress?.address}
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
            <option value="">
              {housesData?.boardingHouseAddress?.province}
            </option>
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
            <option defaultValue={true} value="">
              {housesData?.boardingHouseAddress?.district}
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
            <option value="">{housesData?.boardingHouseAddress?.ward}</option>
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
            Edit
          </button>
          <button className="btn btn1 float-start" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default EditList;
