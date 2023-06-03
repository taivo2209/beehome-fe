import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Swal from 'sweetalert2';
import useTrans from '../../../pages/hooks/useTran';

const Form = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [birthDate, setBirthDate] = useState('');
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

    const data = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      birthDate: birthDate,
      phoneNumber: phoneNum,
    };

    try {
      const res = await axios.post(
        'http://localhost:5000/customer/auth/register',
        data,
      );
      // console.log(res.data);
      Swal.fire({
        icon: 'success',
        title: `${trans.register.thong_bao}`,
        text: `${trans.register.thong_bao_cus}`,
        confirmButtonText: 'OK',
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
  const trans = useTrans();
  return (
    <form action="#" onSubmit={handleSubmit}>
      <div className="heading text-center">
        <h3>{trans.register.text_1}</h3>
        <p className="text-center">
          {trans.register.text}{' '}
          <Link href="/login" className="text-thm">
            {trans.register.dang_nhap}
          </Link>
        </p>
      </div>
      {/* End .heading */}
      {/* End .form-group */}

      <div className="form-group input-group  ">
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

      <div className="form-group input-group  ">
        <input
          type="text"
          className="form-control"
          required
          placeholder={trans.register.ten}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      {/* End .form-group */}

      <div className="form-group input-group  ">
        <input
          type="text"
          className="form-control"
          required
          placeholder={trans.register.ho}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      {/* End .form-group */}

      <div className="form-group input-group  ">
        <input
          type="text"
          className="form-control"
          required
          placeholder={trans.register.sdt}
          onChange={(e) => setPhoneNum(e.target.value)}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-smartphone-call"></i>
          </div>
        </div>
      </div>
      {/* End .form-group */}

      <div className="form-group input-group  ">
        <input
          type="date"
          className="form-control"
          required
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>

      {/* End .form-group */}

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
