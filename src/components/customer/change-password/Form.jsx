import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import useTrans from '../../../pages/hooks/useTran';
import { useRouter } from 'next/router';

const Form = () => {
  const router = useRouter();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleToggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const handleSubmit = async (e) => {
    const data = {
      password: password,
      newPassword: newPassword,
    };
    let url = 'http://localhost:5000/customer/profile/update-password';

    e.preventDefault();
    try {
      const res = await axios.patch(url, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      Swal.fire({
        icon: 'success',
        title: `${trans.cus_profile.thong_bao}`,
        showConfirmButton: false,
        timer: 1500,
      });
      router.push('/')
    } catch (err) {
      if (err.response && err.response.data.debugInfo.status === 417) {
        Swal.fire({
          icon: 'error',
          title: `${trans.cus_profile.thong_bao_1}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  const trans = useTrans();
  return (
    <form action="#" onSubmit={handleSubmit}>
      <div className="heading text-center">
        <h3>{trans.header.doi_mk}</h3>
      </div>
      
      {/* End .heading */}

      <div className="form-group input-group">
        <input
          type={passwordVisible ? 'text' : 'password'}
          className="form-control"
          required
          placeholder={trans.cus_profile.mk_hien_tai}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-password"></i>
          </div>
        </div> */}
        <div className="input-group-append">
          <button
            className="input-group-text"
            type="button"
            onClick={handleTogglePasswordVisibility}
          >
            {passwordVisible ? (
              <i className="fa fa-eye-slash"></i>
            ) : (
              <i className="fa fa-eye"></i>
            )}
          </button>
        </div>
      </div>
      {/* End .form-group */}

      <div className="form-group input-group">
        <input
          type={newPasswordVisible ? 'text' : 'password'}
          className="form-control"
          required
          placeholder={trans.cus_profile.mk_moi}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {/* <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-password"></i>
          </div>
        </div> */}
        <div className="input-group-prepend">
          <button
            className="input-group-text"
            type="button"
            onClick={handleToggleNewPasswordVisibility}
          >
            {newPasswordVisible ? (
              <span>
                <i className="fa fa-eye-slash"></i>
              </span>
            ) : (
              <span>
                <i className="fa fa-eye"></i>
              </span>
            )}
          </button>
        </div>
      </div>
      {/* End .form-group */}

      <button type="submit" className="btn btn-log w-100 btn-thm">
        {trans.cus_profile.cap_nhat}
      </button>
      {/* login button */}
    </form>
  );
};

export default Form;
