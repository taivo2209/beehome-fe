import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropertyMediaUploader from '../PropertyMediaUploader';
import CategoriesCheckBox from './CategoriesCheckBox';
import { useSelector } from 'react-redux';
import AttributesCheckBox from './AttributesCheckBox';

function FormEdit({ id, updateData }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [acreage, setAcreage] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [categoryIds, setCategoryIds] = useState([]);
  const [attributeIds, setAttributeIds] = useState([]);
  const [imgIds, setImgIds] = useState([]);
  const [data, setData] = useState({});

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/lessor/room/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(res.data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      roomId: id,
      name: name,
      price: price,
      acreage: acreage,
      imgIds: imgIds,
      categoryIds: categoryIds,
      attributeIds: attributeIds,
      status: status,
    };
    try {
      axios.patch('http://localhost:5000/lessor/room', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      updateData();
    } catch (err) {
      console.log(err);
    }
    console.log(formData);
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

  useEffect(() => {}, [categoryIds, attributeIds]);
  // console.log('categoryIds', categoryIds);
  // console.log('attri', attributeIds);

  return (
    <>
      <span className="flaticon-edit" onClick={handleShow}></span>

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
                defaultValue={data?.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="my_profile_setting_input form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                defaultValue={data?.price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="my_profile_setting_input form-group">
              <label htmlFor="acreage">Acreage</label>
              <input
                type="text"
                className="form-control"
                id="acreage"
                defaultValue={data?.acreage}
                onChange={(e) => setAcreage(e.target.value)}
              />
            </div>
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
                  <option value="BANNED">BANNED</option>
                </select>
              </div>
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
            <Button type="submit">Edit</Button>
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
