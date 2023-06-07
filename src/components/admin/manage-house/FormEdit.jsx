import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import useTrans from '../../../pages/hooks/useTran';

function FormEdit({ id, getNewData }) {
  const trans = useTrans();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [status, setStatus] = useState('ACTIVE');

  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: id,
      adminStatus: status,
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
          `http://localhost:5000/admin/boardingHouse`,
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
          title: 'Edit Success!',
          showConfirmButton: false,
          timer: 1500,
        });
        getNewData();
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(data);
  };

  return (
    <>
      <span className="flaticon-edit" onClick={handleShow}></span>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Status</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option disabled>Select</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormEdit;
