import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../features/auth/authSlice';
import Swal from 'sweetalert2';
import { fetchCustomer } from '../../features/customer/customerSlice';
import useTrans from '../../pages/hooks/useTran';

const Form = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    const loginData = {
      email: email,
      password: password,
    };
    let url = '';
    if (role === 'lessor') {
      url = 'http://localhost:5000/lessor/auth/login';
    } else if (role === 'customer') {
      url = 'http://localhost:5000/customer/auth/login';
    } else if (role === 'admin') {
      url = 'http://localhost:5000/admin/auth/login';
    }

    e.preventDefault();
    try {
      const res = await axios.post(url, loginData);

      // Do something with the response, such as redirecting to a dashboard page
      dispatch(setAccessToken(res.data.accessToken));
      if (role === 'customer') {
        dispatch(fetchCustomer(res.data.accessToken));
      }

      Swal.fire({
        icon: 'success',
        title: `${trans.login.thong_bao}`,
        showConfirmButton: false,
        timer: 1500,
      });
      if (role === 'lessor') {
        router.push('/my-houses');
      } else if (role === 'customer') {
        router.push('/');
      } else if (role === 'admin') {
        router.push('/manage-lessor');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `${trans.login.thong_bao_1}`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
      // Handle the error, such as displaying an error message to the user
    }
  };
  const trans = useTrans();
  return (
    <form action="#" onSubmit={handleSubmit}>
      <div className="heading text-center">
        <h3>{trans.login.text}</h3>
        <p className="text-center">
          {trans.login.text_1}{' '}
          <Link href="/register-customer" className="text-thm">
            {trans.login.dang_ky}
          </Link>
        </p>
        <p className="text-center">
          {trans.login.text_2}{' '}
          <Link href="/register" className="text-thm">
            {trans.login.dang_ky}
          </Link>
        </p>
      </div>
      {/* End .heading */}

      <div className="input-group mb-2 mr-sm-2">
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
      {/* End .input-group */}

      <div className="form-group input-group">
        <input
          type={passwordVisible ? 'text' : 'password'}
          className="form-control"
          required
          placeholder={trans.login.mat_khau}
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

      <div className="form-group input-group">
        <select
          value={role}
          className="selectpicker form-select"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="customer">{trans.login.khach_hang}</option>
          <option value="lessor">{trans.login.chu_nha}</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      {/* End .input-group */}

      <div className="form-group form-check custom-checkbox mb-3">
        {/* <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="remeberMe"
        />
        <label
          className="form-check-label form-check-label"
          htmlFor="remeberMe"
        >
          Remember me
        </label> */}

        <Link className="btn-fpswd float-end" href="/customer-forgot-password">
          {trans.login.quen_mk}
        </Link>
      </div>
      {/* End .form-group */}

      <button type="submit" className="btn btn-log w-100 btn-thm">
        {trans.login.dang_nhap}
      </button>
      {/* login button */}
    </form>
  );
};

export default Form;
