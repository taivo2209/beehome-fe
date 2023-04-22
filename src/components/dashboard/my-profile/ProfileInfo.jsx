import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ProfileInfo = () => {
  const [profile, setProfile] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/lessor/auth/current',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setData(res.data);
      // console.log(accessToken);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // upload profile
  const uploadProfile = (e) => {
    setProfile(e.target.files[0]);
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="wrap-custom-file">
          <input
            type="file"
            id="image1"
            accept="image/png, image/gif, image/jpeg"
            onChange={uploadProfile}
          />
          <label
            style={
              profile !== null
                ? {
                    backgroundImage: `url(${URL.createObjectURL(profile)})`,
                  }
                : undefined
            }
            htmlFor="image1"
          >
            <span>
              <i className="flaticon-download"></i> Upload Photo{' '}
            </span>
          </label>
        </div>
        <p>*minimum 260px x 260px</p>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput1">Name</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput1"
            placeholder={data?.name}
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
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-xl-12 text-right">
        <div className="my_profile_setting_input">
          <button className="btn btn1">View Public Profile</button>
          <button className="btn btn2">Update Profile</button>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default ProfileInfo;
