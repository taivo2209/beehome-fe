import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../features/auth/authSlice';

const Form = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');

  const handleSubmit = async (e) => {
    const loginData = {
      username: email,
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
      if (role === 'lessor') {
        router.push('/my-houses');
      } else if (role === 'customer') {
        router.push('/');
      } else if (role === 'admin') {
        router.push('/manage-lessor');
      }
    } catch (error) {
      console.error(error);
      // Handle the error, such as displaying an error message to the user
    }
  };

  return (
    <form action="#" onSubmit={handleSubmit}>
      <div className="heading text-center">
        <h3>Login to your account</h3>
        <p className="text-center">
          Dont have an account?{' '}
          <Link href="/register" className="text-thm">
            Sign Up!
          </Link>
        </p>
      </div>
      {/* End .heading */}

      <div className="input-group mb-2 mr-sm-2">
        <input
          type="text"
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

      <div className="input-group form-group">
        <input
          type="password"
          className="form-control"
          required
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-password"></i>
          </div>
        </div>
      </div>

      <div className="form-group input-group  ">
        <select
          value={role}
          className="form-control"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="customer">Customer</option>
          <option value="lessor">Lessor</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      {/* End .input-group */}

      <div className="form-group form-check custom-checkbox mb-3">
        <input
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
        </label>

        <a className="btn-fpswd float-end" href="#">
          Forgot password?
        </a>
      </div>
      {/* End .form-group */}

      <button type="submit" className="btn btn-log w-100 btn-thm">
        Log In
      </button>
      {/* login button */}
    </form>
  );
};

export default Form;
