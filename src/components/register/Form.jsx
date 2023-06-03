import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Swal from 'sweetalert2';
import useTrans from '../../pages/hooks/useTran';
import { t } from 'i18next';

const Form = () => {
  const router = useRouter();
  const trans = useTrans();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: `${trans.register.thong_bao_3}`,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    let url = 'http://localhost:5000/lessor/auth/register';
    try {
      const res = await axios.post(url, { email, password, address, phoneNumber });
      // console.log(res.data);
      Swal.fire({
        icon: 'success',
        title: `${trans.register.thong_bao}`,
        showConfirmButton: false,
        timer: 1500,
      });
      router.push('/login');
    } catch (err) {
      if (err.response && err.response.data.debugInfo.status === 409) {
        Swal.fire({
          icon: 'error',
          title: `${trans.register.thong_bao_1}`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: `${trans.register.thong_bao_2}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // console.log(err);
    }
  };
  return (
    <form action="#" onSubmit={handleSubmit}>
      <div className="heading text-center">
        <h3>{trans.register.text_2}</h3>
        <p className="text-center">
          {trans.register.text}{' '}
          <Link href="/login" className="text-thm">
            {trans.register.dang_nhap}
          </Link>
        </p>
      </div>
      {/* End .heading */}
      {/* End .form-group */}

      <div className="form-group input-group">
        <input
          type="email"
          className="form-control"
          required
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fa fa-envelope-o"></i>
          </div>
        </div>
      </div>
      {/* End .form-group */}

      <div className="form-group input-group">
        <input
          type={passwordVisible ? 'text' : 'password'}
          className="form-control"
          required
          placeholder={trans.register.mat_khau}
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
          type={confirmPasswordVisible ? 'text' : 'password'}
          className="form-control"
          required
          placeholder={trans.register.xac_nhan}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
            onClick={handleToggleConfirmPasswordVisibility}
          >
            {confirmPasswordVisible ? (
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
      <div className="form-group input-group">
        <input
          type="text"
          className="form-control"
          required
          placeholder={trans.register.dia_chi}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-maps-and-flags"></i>
          </div>
        </div>
      </div>

      <div className="form-group input-group">
        <input
          type="text"
          className="form-control"
          required
          placeholder={trans.register.sdt}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-smartphone-call"></i>
          </div>
        </div>
      </div>

      <div className="form-group form-check custom-checkbox mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          required
          id="terms"
        />
        <label className="form-check-label form-check-label" htmlFor="terms">
          {trans.register.text_3}
        </label>
      </div>
      {/* End .form-group */}

      <button type="submit" className="btn btn-log w-100 btn-thm">
        {trans.register.dang_ky}
      </button>
      {/* login button */}
    </form>
  );
};

export default Form;
