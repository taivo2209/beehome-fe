import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import FloorDetail from './FloorDetail';

function FormView(props) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFloorClick = () => {
    handleClose();
    setShow(true);
  };
  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/lessor/boardingHouse/${props.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setData(res.data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <span className="flaticon-view" onClick={handleShow}></span>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin thuê nhà</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              Rent Deposits:{' '}
              {data?.boardingHouseRentDeposits?.map((item) => (
                <p key={item.id}>{item.content}</p>
              ))}
            </li>
            <li>
              Rent Rules:{' '}
              {data?.boardingHouseRules?.map((item) => (
                <p key={item.id}>{item.content}</p>
              ))}
            </li>
            <li>
              Address: {data?.boardingHouseAddress?.address},{' '}
              {data?.boardingHouseAddress?.ward},{' '}
              {data?.boardingHouseAddress?.district},{' '}
              {data?.boardingHouseAddress?.province}
            </li>
            <li>
              Tag:{' '}
              {data?.boardingHouseToTags?.map((item) => (
                <span key={item.id}>{item.tag.name} </span>
              ))}
            </li>
            <li onClick={handleFloorClick}>
              Floor:
              <FloorDetail floorData={data.floors}/>
            </li>
          </ul>
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

export default FormView;
