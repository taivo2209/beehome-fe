import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

function FormView({ id, getNewData }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/lessor/room/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin {data?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              <span className='color-danger'>Price: </span>
              <span>{data?.price}</span>
            </li>
            <li>
              <span className='color-danger'>Acreage: </span>
              <span>{data?.acreage}</span>
            </li>
            <li>
              <span className='color-danger'>Status: </span>
              <span>{data?.status}</span>
            </li>
            <li>
              <span className='color-danger'>Room Categories: </span>
              <span>
                {data?.roomToCategories?.map((roomCategory) => (
                  <div key={roomCategory.id}>
                    {roomCategory?.categoryType?.categoryTypeDetails?.map(
                      (categoryDetails) => (
                        <span key={categoryDetails.id}>
                          {categoryDetails?.name}{' '}
                        </span>
                      ),
                    )}
                  </div>
                ))}
              </span>
            </li>
            <li>
              <span className='color-danger'>Room Attributes: </span>
              <span>
                {data?.roomToAttributes?.map((roomAttribute) => (
                  <div key={roomAttribute.id}>
                    {roomAttribute?.roomAttributeTerm?.roomAttributeTermDetails?.map(
                      (attributeDetails) => (
                        <span key={attributeDetails.id}>
                          {attributeDetails?.name}{' '}
                        </span>
                      ),
                    )}
                  </div>
                ))}
              </span>
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
