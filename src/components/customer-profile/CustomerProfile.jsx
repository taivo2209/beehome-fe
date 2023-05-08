import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const CustomerProfile = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [data, setData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');

  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/customer/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(res.data);
      // console.log(accessToken);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(data.avatar);
  // console.log(newPath);
//   const handleSubmit = async () => {
//     const formData = {
//       name: name,
//       address: address,
//       phoneNumber: phoneNumber,
//       avatarId: avatarId,
//     };
//     try {
//       const res = await axios.put(
//         'http://localhost:5000/lessor/profile',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         },
//       );
//       Swal.fire({
//         icon: 'success',
//         title: 'Cập nhật thành công!',
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       // console.log(accessToken);
//     } catch (err) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Đã xảy ra lỗi!',
//         text: 'Vui lòng thử lại sau.',
//         confirmButtonText: 'OK',
//       });
//       console.log(err);
//     }
//     // console.log(formData);
//   };

  useEffect(() => {
    getData();
  }, []);

//   const handleImageUpload = async () => {
//     const formData = new FormData();
//     formData.append('photo_url', selectedImage);

//     try {
//       const res = await axios.post(
//         'http://localhost:5000/upload-file/single-file',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         },
//       );
//       setAvatarId(res.data.id);
//       // console.log('Image uploaded successfully!', res.data);
//     } catch (error) {
//       console.error('Error uploading image: ', error);
//     }
//     // console.log('avatarID',avatarId);
//   };

//   useEffect(() => {
//     handleImageUpload();
//   }, [selectedImage]);
//   const handleImageSelect = (event) => {
//     setSelectedImage(event.target.files[0]);
//   };

  return (
    <div className="row">
      <div className="col-lg-12">
        {/* <div className="wrap-custom-file">
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
              <i className="flaticon-download"></i> Upload Photo{' '}
            </span>
          </label>
        </div> */}
        {/* <p>*minimum 260px x 260px</p> */}
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput1">First Name</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput1"
            placeholder={data?.firstName}
            // onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput6">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput6"
            placeholder={data?.lastName}
            // onChange={(e) => setName(e.target.value)}
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
            placeholder={data?.email}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput3">Address</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput3"
            placeholder={data?.address}
            // onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput4">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput4"
            placeholder={data?.phoneNumber}
            // onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput5">Birth Date</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput5"
            placeholder={data?.birthDate}
            // onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      {/* <div className="col-xl-12 text-right">
        <div className="my_profile_setting_input">
          <button className="btn btn2" onClick={handleSubmit}>
            Update Profile
          </button>
        </div>
      </div> */}
      {/* End .col */}
    </div>
  );
};

export default CustomerProfile;
