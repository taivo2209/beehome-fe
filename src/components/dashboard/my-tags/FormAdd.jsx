import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

function FormAdd({getData}) {
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
      const res = await axios.post(
        'http://localhost:5000/lessor/tag',
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      // reset();
      getData();
      handleClose();
    } catch (error) {
      console.log(error);
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
            <Button variant="primary" type="submit">
              Add
            </Button>
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

export default FormAdd;
