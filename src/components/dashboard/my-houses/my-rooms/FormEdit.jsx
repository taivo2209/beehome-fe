import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropertyMediaUploader from '../PropertyMediaUploader';
import { useSelector } from 'react-redux';
import AttributesCheckBox from './AttributesCheckBox';
import useTrans from '../../../../pages/hooks/useTran';
import Swal from 'sweetalert2';

function FormEdit({ id, updateData }) {
  const trans = useTrans();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState({});
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [acreage, setAcreage] = useState('');
  const [roomSimple, setRoomSimple] = useState('');
  const [toilet, setToilet] = useState('1');
  const [status, setStatus] = useState('ACTIVE');
  const [attributeIds, setAttributeIds] = useState([]);
  const [imgIds, setImgIds] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/lessor/room/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(res.data);
      setName(res.data?.name);
      setPrice(res.data?.price);
      setAcreage(res.data?.acreage);
      setStatus(res.data?.status);
      setRoomSimple(res.data?.roomSimple);
      setToilet(res.data?.toilet);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      roomId: id,
      name: name,
      price: price,
      acreage: acreage,
      roomSimple: roomSimple,
      toilet: toilet,
      imgIds: imgIds,
      categoryIds: categoryIds,
      attributeIds: attributeIds,
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
        await axios.patch('http://localhost:5000/lessor/room', formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        Swal.fire({
          icon: 'success',
          title: `${trans.lessor.cap_nhat}`,
          showConfirmButton: false,
          timer: 1500,
        });
        updateData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAttributeChange = async (selections) => {
    setAttributeIds(selections);
  };

  const handleUpload = (newImages) => {
    setImgIds(newImages);
  };

  useEffect(() => {}, [attributeIds]);
  // console.log('categoryIds', categoryIds);
  // console.log('attri', attributeIds);

  return (
    <>
      <span className="flaticon-edit" onClick={handleShow}></span>

      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>{trans.lessor.rooms.cap_nhat}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="my_profile_setting_input form-group">
              <label htmlFor="name">{trans.lessor.rooms.ten_phong}</label>
              <input
                type="text"
                className="form-control"
                id="name"
                defaultValue={data?.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="my_profile_setting_input form-group">
              <label htmlFor="acreage">{trans.lessor.rooms.dien_tich}</label>
              <input
                type="text"
                className="form-control"
                id="acreage"
                defaultValue={data?.acreage}
                onChange={(e) => setAcreage(e.target.value)}
              />
            </div>
            <div className="row">
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="roomSimple">
                    {trans.lessor.rooms.so_phong_ngu}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="roomSimple"
                    defaultValue={data?.roomSimple}
                    onChange={(e) => setRoomSimple(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="toilet">{trans.lessor.rooms.toilet}</label>
                  <input
                    type="text"
                    className="form-control"
                    id="toilet"
                    defaultValue={data?.toilet}
                    onChange={(e) => setToilet(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="my_profile_setting_input form-group">
              <label htmlFor="price">{trans.lessor.rooms.gia}</label>
              <input
                type="text"
                className="form-control"
                id="price"
                defaultValue={data?.price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>{trans.lessor.rooms.tinh_trang}</label>
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
            <div className="my_profile_setting_input form-group mb-2">
              <label htmlFor="attributeIds">
                {trans.lessor.rooms.tien_ich}
              </label>
              <AttributesCheckBox onSelectionChange={handleAttributeChange} />
            </div>
            <div className="my_profile_setting_input form-group mb-2">
              <label htmlFor="imagesId">{trans.lessor.rooms.anh}</label>
              <PropertyMediaUploader onUpload={handleUpload} />
            </div>
            <div className="col-xl-12">
              <div className="my_profile_setting_input overflow-hidden mt20">
                <button className="btn btn2" type="submit">
                  Edit
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default FormEdit;
