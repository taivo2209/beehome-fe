import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import useTrans from '../../../pages/hooks/useTran';

function FormView({ id, getDataNew }) {
  const trans = useTrans();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/lessor/roomAttribute/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setData(res.data);
      // console.log(data);
      // console.log(accessToken);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, [getDataNew]);
  return (
    <>
      <span className="flaticon-view" onClick={handleShow}></span>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {data.roomAttributeTerms?.map((roomAttributeTerms) => (
              <div key={roomAttributeTerms.id} className="col-lg-6 col-xl-6">
                {roomAttributeTerms.roomAttributeTermDetails?.map(
                  (roomAttributeTermDetails) => (
                    <h1
                      className="form-control"
                      key={roomAttributeTermDetails.id}
                    >
                      {roomAttributeTermDetails.name}
                    </h1>
                  ),
                )}
              </div>
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

export default FormView;
