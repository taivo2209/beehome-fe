import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Ho_Chi_Minh');
function FormAdd({ getData }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dateDisable, setDateDisable] = useState('');

  const accessToken = useSelector((state) => state.auth.accessToken);

  const validateInputs = () => {
    if (!dateDisable) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng điền đầy đủ thông tin',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateInputs();
    const data = {
      dateDisable: dateDisable,
    };

    if (isValid) {
      try {
        const res = await axios.post(
          'http://localhost:5000/lessor/book-disable',
          data,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        // reset();
        Swal.fire({
          icon: 'success',
          title: 'Tạo thành công!',
          showConfirmButton: false,
          timer: 1500,
        });
        getData();

        handleClose();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Đã xảy ra lỗi!',
          text: 'Thêm mới thất bại.',
          confirmButtonText: 'OK',
        });
        console.log(error);
      }
    }
    // console.log(data);
  };

  const handleDateChange = (date) => {
    setDateDisable(dayjs(date).tz('Asia/Ho_Chi_Minh').set('hour', 9));
  };

  const disablePastDates = (date) => {
    const today = dayjs().tz('Asia/Ho_Chi_Minh');
    const minDate = today.add(14, 'day');
    return date < minDate;
  };

  return (
    <>
      <button
        className={`list-inline-item add_listing`}
        style={{
          border: 'none',
          backgroundColor: '#ee7b35',
          padding: '10px',
          color: 'white',
          borderRadius: '30px',
        }}
        onClick={handleShow}
      >
        <span className="flaticon-plus"></span>
        <span className="dn-lg"> Busy Dates</span>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-2 mr-sm-2">
              {/* <input
                type="date"
                className="form-control"
                onChange={(e) => setDateDisable(e.target.value)}
                required
              /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select a date"
                  inputFormat="dd/MM/yyyy"
                  shouldDisableDate={disablePastDates}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
            </div>
            <div className="my_profile_setting_input overflow-hidden mt20">
              <button type="submit" className="btn btn2 float-end">
                Add
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FormAdd;
