import { Rating } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ReviewBox = ({ accessToken, boardingHouseId, getData }) => {
  const [star, setStar] = useState(2);
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      boardingHouseId: boardingHouseId,
      star: String(star),
      content: content,
    };
    try {
      const res = await axios.post(
        'http://localhost:5000/customer/comment',
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      getData();
      Swal.fire({
        icon: 'success',
        title: 'Tạo thành công!',
        showConfirmButton: false,
        timer: 1500,
      });
      // getData();
      // handleClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Đã xảy ra lỗi!',
        text: 'Vui lòng thử lại sau.',
        confirmButtonText: 'OK',
      });
      console.log(error);
    }
  };

  return (
    <form className="comments_form">
      {/* End .form-group */}
      <Rating
        name="simple-controlled"
        value={star}
        onChange={(event, newValue) => {
          setStar(newValue);
        }}
      />
      <div className="form-group">
        <textarea
          className="form-control"
          rows="6"
          placeholder="Your Review"
          required
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      {/* End .form-group */}

      <button type="submit" className="btn btn-thm" onClick={handleSubmit}>
        Submit Review
      </button>
      {/* End .btn */}
    </form>
  );
};

export default ReviewBox;
