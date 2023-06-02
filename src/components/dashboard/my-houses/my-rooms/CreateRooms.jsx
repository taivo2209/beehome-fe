import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import PropertyMediaUploader from '../PropertyMediaUploader';
import { useSelector } from 'react-redux';
import AttributesCheckBox from './AttributesCheckBox';
import Swal from 'sweetalert2';
import useTrans from '../../../../pages/hooks/useTran';

function CreateRooms({ floorId, updateData, province, district, ward }) {
  const trans = useTrans();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/lessor/room/check-number-room',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setShow(true);
    } catch (err) {
      if (err.response && err.response.data.debugInfo.status === 409) {
        Swal.fire({
          icon: 'error',
          title: `${trans.lessor.rooms.het_phong}`,
          text: `${trans.lessor.rooms.het_phong_text}`,
          showConfirmButton: true,
        });
      }
    }
  };
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [acreage, setAcreage] = useState('');
  const [roomSimple, setRoomSimple] = useState('');
  const [toilet, setToilet] = useState('1');
  const [imgIds, setImgIds] = useState([]);
  const [attributeIds, setAttributeIds] = useState([]);
  const [prediction, setPrediction] = useState();

  const validateInputs = () => {
    if (
      !name ||
      !price ||
      !acreage ||
      !roomSimple ||
      !toilet ||
      !imgIds ||
      !attributeIds
    ) {
      Swal.fire({
        icon: 'error',
        title: `${trans.lessor.loi}`,
        text: `${trans.lessor.loi_2}`,
        confirmButtonText: 'OK',
      });
      return false;
    }
    if (
      isNaN(Number(price)) ||
      isNaN(Number(acreage)) ||
      isNaN(Number(toilet))
    ) {
      Swal.fire({
        icon: 'error',
        title: `${trans.lessor.rooms.text}`,
        text: `${trans.lessor.rooms.text_1}`,
      });
      return false;
    }
    if (Number(price) < 0 || Number(acreage) < 0 || Number(toilet) < 0) {
      Swal.fire({
        icon: 'error',
        title: `${trans.lessor.rooms.text}`,
        text: `${trans.lessor.rooms.text_2}`,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateInputs();

    const formData = {
      floorId: floorId,
      name: name,
      price: price,
      acreage: acreage,
      roomSimple: roomSimple,
      toilet: toilet,
      imgIds: imgIds,
      attributeIds: attributeIds,
    };
    if (isValid) {
      try {
        axios.post('http://localhost:5000/lessor/room', formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        Swal.fire({
          icon: 'success',
          title: `${trans.lessor.tao_thanh_cong}`,
          showConfirmButton: false,
          timer: 1500,
        });
        updateData();
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: `${trans.lessor.loi}`,
          text: `${trans.lessor.loi_1}`,
          confirmButtonText: 'OK',
        });
        console.log(err);
      }
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

  useEffect(() => {}, [attributeIds]);
  // console.log('categoryIds', categoryIds);
  // console.log('attri', attributeIds);
  const predict = async () => {
    if (province && district && ward && acreage && toilet && roomSimple) {
      let url = `http://localhost:5000/lessor/predict/predictions?province=${province}&district=${district}&ward=${ward}&acreage=${acreage}&toilet=${toilet}&room=${roomSimple}`;
      try {
        const res = await axios.get(url);
        const title =
          trans.lessor.rooms.du_doan +
          String(res.data?.predictions?.[0]).replace(
            /\B(?=(\d{3})+(?!\d))/g,
            '.',
          ) +
          trans.detail.gia_thang;
        setPrediction(title);
      } catch (error) {
        setPrediction(`${trans.lessor.rooms.du_doan_tb}`);
      }
    }
  };
  useEffect(() => {
    predict();
  }, [acreage, toilet, roomSimple]);

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
        <span className="dn-lg"> {trans.lessor.rooms.tao_phong}</span>
      </button>

      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>{trans.lessor.rooms.tao_phong}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="my_profile_setting_input form-group">
              <label htmlFor="name">{trans.lessor.rooms.ten_phong}</label>
              <input
                type="text"
                className="form-control"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="my_profile_setting_input form-group">
              <label htmlFor="acreage">{trans.lessor.rooms.dien_tich}</label>
              <input
                type="text"
                className="form-control"
                id="acreage"
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
                onChange={(e) => setPrice(e.target.value)}
              />
              {prediction ? (
                <span className="text-danger">
                  {/* {trans.lessor.rooms.du_doan} */}
                  {String(prediction).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  {/* {trans.detail.gia_thang} */}
                </span>
              ) : null}
            </div>
            <div className="row">
              <div className="my_profile_setting_input form-group mb-2">
                <label htmlFor="attributeIds">
                  {trans.lessor.rooms.tien_ich}
                </label>
                <AttributesCheckBox onSelectionChange={handleAttributeChange} />
              </div>
            </div>
            <div className="my_profile_setting_input form-group mb-2">
              <label htmlFor="imagesId">{trans.lessor.rooms.anh}</label>
              <PropertyMediaUploader onUpload={handleUpload} />
            </div>
            <div className="col-xl-12">
              <div className="my_profile_setting_input overflow-hidden mt20">
                <button className="btn btn2" type="submit">
                  {trans.lessor.tao}
                </button>
              </div>
            </div>
            {/* <button className="btn btn2" type="submit">
              {trans.lessor.tao}
            </button> */}
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateRooms;
