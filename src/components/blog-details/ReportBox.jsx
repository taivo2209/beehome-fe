import { Rating } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useTrans from '../../pages/hooks/useTran';

const ReportBox = () => {
  const [content, setContent] = useState('');
  const trans = useTrans();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = {
//       boardingHouseId: boardingHouseId,
//       star: String(star),
//       content: content,
//     };
//     console.log(data);
//     try {
//       const res = await axios.post(
//         'http://localhost:5000/customer/comment',
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         },
//       );
//       getData();
//       Swal.fire({
//         icon: 'success',
//         title: `${trans.detail.danh_gia.thanh_cong}`,
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       // getData();
//       // handleClose();
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: `${trans.detail.danh_gia.loi}`,
//         text: `${trans.detail.danh_gia.loi_1}`,
//         confirmButtonText: 'OK',
//       });
//       console.log(error);
//     }
//   };

  return (
    <form className="comments_form">
      {/* End .form-group */}
      
      <div className="form-group">
        <textarea
          className="form-control"
          rows="6"
          placeholder={trans.detail.noi_dung_bc}
          required
        //   onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      {/* End .form-group */}

      <button type="submit" className="btn btn-thm bg-danger border-0">
        {trans.detail.bao_cao}
      </button>
      {/* End .btn */}
    </form>
  );
};

export default ReportBox;
