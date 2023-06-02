import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RoomsData from './my-rooms/RoomsData';
import useTrans from '../../../pages/hooks/useTran';

function FloorDetail({ floorData, province, district, ward }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //   console.log(floorData);
  const trans = useTrans();

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
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{trans.lessor.houses.thong_tin_tang}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="floor-detail">
            {floorData?.map((item) => (
              <RoomsData
                key={item.id}
                floorData={item}
                province={province}
                district={district}
                ward={ward}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {trans.dong}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FloorDetail;
