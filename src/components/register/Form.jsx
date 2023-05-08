import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";

const Form = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = "http://localhost:5000/lessor/auth/register";
    try {
      const res = await axios.post(url, { email, password});
      // console.log(res.data);
      Swal.fire({
        icon: 'success',
        title: 'Đăng ký thành công!',
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/login");
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng nhập đầy đủ thông tin!',
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(err);
    }
  };
  return (
    <form action="#" onSubmit={handleSubmit}>
      <div className="heading text-center">
        <h3>Register to your account as a Lessor</h3>
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-thm">
            Login
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

      <div className="form-group input-group  ">
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
          I have read and accept the Terms and Privacy Policy?
        </label>
      </div>
      {/* End .form-group */}

      <button type="submit" className="btn btn-log w-100 btn-thm">
        Register
      </button>
      {/* login button */}
    </form>
  );
};

export default Form;
