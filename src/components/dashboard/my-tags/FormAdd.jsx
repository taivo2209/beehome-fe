import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

function FormAdd({ getData }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  const accessToken = useSelector((state) => state.auth.accessToken);

  const validateInputs = () => {
    if (
      !name ||
      !slug ||
      !description 
    ) {
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
      name: name,
      slug: slug,
      description: description,
    };

    if (isValid){

      try {
        const res = await axios.post('http://localhost:5000/lessor/tag', data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
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
        <span className="dn-lg"> Create Tags</span>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
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
