import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

function FormEdit({ id, getData }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      slug: slug,
      description: description,
    };
    try {
      const res = await axios.patch(
        `http://localhost:5000/lessor/tag/${id}`,
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
        title: 'Cập nhật thành công!',
        showConfirmButton: false,
        timer: 1500,
      });
      getData();
      handleClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Đã xảy ra lỗi!',
        text: 'Vui lòng thử lại sau.',
        confirmButtonText: 'OK',
      });
      console.log(error);
    }
    // console.log(data);
  };

  return (
    <>
      <span className="flaticon-edit" onClick={handleShow}></span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-2 mr-sm-2">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Tag Name"
              />
            </div>
            <div className="input-group form-group mb-2 mr-sm-2">
              <input
                type="text"
                className="form-control"
                required
                placeholder="Tag Slug"
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div className="input-group form-group mb-2 mr-sm-2">
              <input
                type="text"
                className="form-control"
                required
                placeholder="Tag Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="my_profile_setting_input overflow-hidden mt20">
              <button type="submit" className="btn btn2 float-end">
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
