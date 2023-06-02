import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import useTrans from '../../../pages/hooks/useTran';

function FormView({id, getNewData}) {
  const trans = useTrans();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/boardingHouse/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setData(res.data);
      getNewData();
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
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {trans.lessor.houses.thong_tin} {data?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              <span className="text-danger">{trans.lessor.houses.loai}: </span>
              <span>{data?.type}</span>
            </li>
            <li>
              <span className="text-danger">{trans.lessor.houses.mo_ta}: </span>
              <span>
                {data?.boardingHouseDescriptions?.map((item) => (
                  <p key={item.id}>{item.content}</p>
                ))}
              </span>
            </li>
            <li>
              <span className="text-danger">
                {trans.lessor.houses.tien_coc}:{' '}
              </span>
              <span>
                {data?.boardingHouseRentDeposits?.map((item) => (
                  <p key={item.id}>{item.content}</p>
                ))}
              </span>
            </li>
            <li>
              <span className="text-danger">
                {trans.lessor.houses.quy_dinh}:{' '}
              </span>
              <span>
                {data?.boardingHouseRules?.map((item) => (
                  <p key={item.id}>{item.content}</p>
                ))}
              </span>
            </li>
            <li>
              <span className="text-danger">
                {trans.lessor.houses.dia_chi}:{' '}
              </span>
              <span>
                {data?.boardingHouseAddress?.address},{' '}
                {data?.boardingHouseAddress?.ward},{' '}
                {data?.boardingHouseAddress?.district},{' '}
                {data?.boardingHouseAddress?.province}
              </span>
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
