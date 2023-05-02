import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropertyMediaUploader from '../PropertyMediaUploader';
import CategoriesCheckBox from './CategoriesCheckBox';
import { useSelector } from 'react-redux';
import AttributesCheckBox from './AttributesCheckBox';
import Swal from 'sweetalert2';

function CreateRooms({ floorId, updateData }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [acreage, setAcreage] = useState('');
  const [imgIds, setImgIds] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [attributeIds, setAttributeIds] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      floorId: floorId,
      name: name,
      price: price,
      acreage: acreage,
      imgIds: imgIds,
      categoryIds: categoryIds,
      attributeIds: attributeIds,
    };
    try {
      axios.post('http://localhost:5000/lessor/room', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Tạo thành công!',
        showConfirmButton: false,
        timer: 1500,
      });
      updateData();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Đã xảy ra lỗi!',
        text: 'Vui lòng thử lại sau.',
        confirmButtonText: 'OK',
      });
      console.log(err);
    }
  };

  const handleCategoryChange = async (selections) => {
    setCategoryIds(selections);
  };

  const handleAttributeChange = async (selections) => {
    setAttributeIds(selections);
  };

  const handleUpload = (newImages) => {
    setImgIds(newImages);
  };
  // console.log('img', imgIds);

  useEffect(() => {}, [categoryIds, attributeIds]);
  // console.log('categoryIds', categoryIds);
  // console.log('attri', attributeIds);

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
        <span className="dn-lg"> Create Rooms</span>
      </button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Add Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="my_profile_setting_input form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="my_profile_setting_input form-group">
              <label htmlFor="price">Price (/month)</label>
              <input
                type="text"
                className="form-control"
                id="price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="my_profile_setting_input form-group">
              <label htmlFor="acreage">Acreage (m2)</label>
              <input
                type="text"
                className="form-control"
                id="acreage"
                onChange={(e) => setAcreage(e.target.value)}
              />
            </div>
            <div className="my_profile_setting_input form-group col-xl-12">
              <label htmlFor="categoryIds">Category</label>
              <CategoriesCheckBox onSelectionChange={handleCategoryChange} />
            </div>
            <div className="my_profile_setting_input form-group mb-2">
              <label htmlFor="attributeIds">Attribute</label>
              <AttributesCheckBox onSelectionChange={handleAttributeChange} />
            </div>
            <div className="my_profile_setting_input form-group mb-2">
              <label htmlFor="imagesId">Images</label>
              <PropertyMediaUploader onUpload={handleUpload} />
            </div>
            <Button type="submit">Create</Button>
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

export default CreateRooms;
