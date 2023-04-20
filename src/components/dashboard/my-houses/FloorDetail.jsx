import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RoomsData from './my-rooms/RoomsData';

function FloorDetail({floorData}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
//   console.log(floorData);

  return (
    <>
      <button
        className="flaticon-view"
        style={{
          border: 'none',
          color: '#ee7b35',
          fontSize: '25px',
          marginLeft: '10px',
          borderRadius: '20px',
        }}
        onClick={handleShow}
      ></button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin các tầng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='floor-detail'>
                {floorData.map(item=> <RoomsData key={item.id} floorData={item}/>)}
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FloorDetail;
