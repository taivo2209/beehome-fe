import { Rating } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useTrans from '../../pages/hooks/useTran';

const ReportBox = ({ accessToken, boardingHouseId }) => {
  const [title, setTitle] = useState('');
  const trans = useTrans();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let currentDate = new Date();
    let formattedDate = currentDate.toISOString();
    const data = {
      boardingHouseId: boardingHouseId,
      title: title,
      dateReport: formattedDate,
    };
    // console.log(data);
    try {
      const res = await axios.post(
        'http://localhost:5000/customer/report',
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      Swal.fire({
        icon: 'success',
        title: `${trans.detail.bao_cao_tc}`,
        showConfirmButton: false,
        timer: 1500,
      });
      // getData();
      // handleClose();
    } catch (error) {
      if (error.response && error.response.data.debugInfo.status === 409) {
        Swal.fire({
          icon: 'warning',
          title: `${trans.detail.bc_full}`,
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: `${trans.detail.danh_gia.loi}`,
          text: `${trans.detail.danh_gia.loi_1}`,
          confirmButtonText: 'OK',
        });
      }
      console.log(error);
    }
  };

  return (
    <form className="comments_form">
      {/* End .form-group */}

      <div className="form-group mb-2">
        <textarea
          className="form-control"
          rows="6"
          placeholder={trans.detail.noi_dung_bc}
          required
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
      </div>
      {/* End .form-group */}

      <button
        type="submit"
        className="btn btn-thm bg-danger border-0"
        onClick={handleSubmit}
      >
        {trans.detail.bao_cao}
      </button>
      {/* End .btn */}
    </form>
  );
};

export default ReportBox;
