import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import FloorDetail from './FloorDetail';
import useTrans from '../../../pages/hooks/useTran';

function FormView(props) {
  const trans = useTrans();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFloorClick = () => {
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
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            {trans.lessor.houses.thong_tin} {data?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              {trans.lessor.houses.loai}: {data?.type}
            </li>
            <li>
              {trans.lessor.houses.mo_ta}:{' '}
              {data?.boardingHouseDescriptions?.map((item) => (
                <p key={item.id}>{item.content}</p>
              ))}
            </li>
            <li>
              {trans.lessor.houses.tien_coc}:{' '}
              {data?.boardingHouseRentDeposits?.map((item) => (
                <p key={item.id}>{item.content}</p>
              ))}
            </li>
            <li>
              {trans.lessor.houses.quy_dinh}:{' '}
              {data?.boardingHouseRules?.map((item) => (
                <p key={item.id}>{item.content}</p>
              ))}
            </li>
            <li>
              <span>{trans.lessor.houses.dia_chi}: </span>
              <span>
                {data?.boardingHouseAddress?.address},{' '}
                {data?.boardingHouseAddress?.ward},{' '}
                {data?.boardingHouseAddress?.district},{' '}
                {data?.boardingHouseAddress?.province}
              </span>
            </li>
            <li>
              Tag:{' '}
              {data?.boardingHouseToTags?.map((item) => (
                <span key={item.id}>{item.tag?.name} </span>
              ))}
            </li>
            <li onClick={handleFloorClick}>
              {trans.lessor.houses.tang}:
              <FloorDetail
                floorData={data?.floors}
                province={data?.boardingHouseAddress?.province}
                district={data?.boardingHouseAddress?.district}
                ward={data?.boardingHouseAddress?.ward}
              />
            </li>
          </ul>
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

export default FormView;
