import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import useTrans from '../../../pages/hooks/useTran';

function FormEdit({ id, getData }) {
  const trans = useTrans();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [status, setStatus] = useState('PROCESSING');

  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      bookId: id,
      status: status,
    };
    try {
      const result = await Swal.fire({
        title: `${trans.lessor.xac_nhan_chinh}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: `${trans.lessor.xac_nhan}`,
        cancelButtonText: `${trans.huy_bo}`,
      });
      if (result.isConfirmed) {
        const res = await axios.patch(
          `http://localhost:5000/lessor/book/status`,
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
          title: `${trans.lessor.cap_nhat}`,
          showConfirmButton: false,
          timer: 1500,
        });
        getData();
        handleClose();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `${trans.lessor.loi}`,
        text: `${trans.lessor.loi_1}`,
        confirmButtonText: 'OK',
      });
      console.log(error);
    }
    // console.log(data);
  };

  return (
    <>
      <span className="flaticon-edit" onClick={handleShow}></span>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{trans.lessor.bookings.tinh_trang}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>{trans.lessor.bookings.tinh_trang}</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option disabled>Select</option>
                  <option value="PROCESSING">
                    {trans.lessor.bookings.dang_cho}
                  </option>
                  <option value="APPROVED">
                    {trans.lessor.bookings.da_xn}
                  </option>
                  <option value="DONE">
                    {trans.lessor.bookings.hoan_thanh}
                  </option>
                  <option value="MISSING">
                    {trans.lessor.bookings.lo_hen}
                  </option>
                </select>
              </div>
            </div>
            <div className="my_profile_setting_input overflow-hidden mt20">
              <button type="submit" className="btn btn2 float-start">
                Edit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FormEdit;
