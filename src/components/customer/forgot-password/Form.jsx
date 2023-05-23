import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Swal from 'sweetalert2';
import useTrans from '../../../pages/hooks/useTran';

const Form = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };

    try {
      const res = await axios.post(
        'http://localhost:5000/customer/auth/forget-password',
        data,
      );
      // console.log(res.data);
      Swal.fire({
        icon: 'success',
        title: `${trans.cus_profile.quen_mk_text_1}`,
        text: `${trans.cus_profile.quen_mk_text_2}`,
        confirmButtonText: 'OK',
      });
    } catch (err) {
      if (err.response && err.response.data.debugInfo.status === 417) {
        Swal.fire({
          icon: 'error',
          title: `${trans.cus_profile.loi}`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: `${trans.cus_profile.loi_1}`,
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
        <h3>{trans.cus_profile.quen_mk_text}</h3>
      </div>
      {/* End .heading */}

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

      <button type="submit" className="btn btn-log w-100 btn-thm">
        {trans.cus_profile.submit}
      </button>
    </form>
  );
};

export default Form;
