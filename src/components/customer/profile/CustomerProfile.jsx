import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import useTrans from '../../../pages/hooks/useTran';

const CustomerProfile = () => {
  const trans = useTrans();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [avatarId, setAvatarId] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  let path = data?.avatar?.path;
  let newPath = path?.replace(/\\/g, '/');

  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/customer/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(res.data);
      setFirstName(res.data?.firstName);
      setLastName(res.data?.lastName);
      setBirthDate(res.data?.birthDate);
      setEmail(res.data?.email);
      setAddress(res.data?.address);
      setAvatarId(res.data?.avatar.id);
      setPhoneNumber(res.data?.phoneNumber);
      setBirthDate(res.data?.birthDate);
      // console.log(accessToken);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    const formData = {
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
      email: email,
      address: address,
      avatarId: avatarId,
      phoneNumber: phoneNumber,
    };
    try {
      const res = await axios.put(
        'http://localhost:5000/customer/profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      Swal.fire({
        icon: 'success',
        title: 'Cập nhật thành công!',
        showConfirmButton: false,
        timer: 1500,
      });
      // console.log(accessToken);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Đã xảy ra lỗi!',
        text: 'Vui lòng thử lại sau.',
        confirmButtonText: 'OK',
      });
      console.log(err);
    }
    // console.log(formData);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('photo_url', selectedImage);

    try {
      const res = await axios.post(
        'http://localhost:5000/upload-file/single-file',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setAvatarId(res.data.id);
      // console.log('Image uploaded successfully!', res.data);
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
    // console.log('avatarID',avatarId);
  };

  useEffect(() => {
    handleImageUpload();
  }, [selectedImage]);
  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="wrap-custom-file">
          <input
            type="file"
            id="image1"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleImageSelect}
          />
          <label
            style={
              selectedImage !== null
                ? {
                    backgroundImage: `url(${URL?.createObjectURL(
                      selectedImage,
                    )})`,
                  }
                : {
                    backgroundImage: `url(${newPath})`,
                  }
            }
            htmlFor="image1"
          >
            <span>
              <i className="flaticon-download"></i> {trans.cus_profile.chon_anh}{' '}
            </span>
          </label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput1">{trans.cus_profile.ten}</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput1"
            defaultValue={data?.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput6">{trans.cus_profile.ho}</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput6"
            defaultValue={data?.lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleEmail">Email</label>
          <input
            type="email"
            className="form-control"
            id="formGroupExampleEmail"
            defaultValue={data?.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput3">{trans.cus_profile.dia_chi}</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput3"
            defaultValue={data?.address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput4">{trans.cus_profile.sdt}</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput4"
            defaultValue={data?.phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput5">{trans.cus_profile.ngay_sinh}</label>
          <input
            type="date"
            className="form-control"
            id="formGroupExampleInput5"
            defaultValue={data?.birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-xl-12 text-right">
        <div className="my_profile_setting_input">
          <button className="btn btn2" onClick={handleSubmit}>
            {trans.cus_profile.cap_nhat}
          </button>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default CustomerProfile;
