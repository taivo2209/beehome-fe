import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import useTrans from '../../../../pages/hooks/useTran';

function FormView({ id, getNewData }) {
  const trans = useTrans();
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
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {trans.lessor.rooms.thong_tin} {data?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              <span className="color-danger">{trans.lessor.rooms.gia}: </span>
              <span>
                {data?.price}
                {trans.detail.gia_thang}
              </span>
            </li>
            <li>
              <span className="color-danger">
                {trans.lessor.rooms.dien_tich}:{' '}
              </span>
              <span>
                {data?.acreage}
                {'m2'}
              </span>
            </li>
            <li>
              <span className="color-danger">
                {trans.lessor.rooms.tinh_trang}:{' '}
              </span>
              <span>{data?.status}</span>
            </li>
            <li>
              <span className="color-danger">
                {trans.lessor.rooms.so_phong_ngu}:{' '}
              </span>
              <span>{data?.roomSimple}</span>
            </li>
            <li>
              <span className="color-danger">
                {trans.lessor.rooms.toilet}:{' '}
              </span>
              <span>{data?.toilet}</span>
            </li>
            <li>
              <span className="color-danger">Room Categories: </span>
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
              <span className="color-danger">
                {trans.lessor.rooms.tien_ich}:{' '}
              </span>
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
            <li>
              <span className="color-danger">{trans.lessor.rooms.anh}: </span>
              <div className="col-lg-12">
                <ul className="mb-0">
                  {data?.roomImages?.length > 0
                    ? data?.roomImages?.map((roomImage, index) => (
                        <li key={index} className="list-inline-item">
                          <div className="portfolio_item">
                            <img
                              className="img-fluid cover"
                              src={roomImage?.localFile?.path.replace(
                                /\\/g,
                                '/',
                              )}
                              alt="img"
                            />
                          </div>
                        </li>
                      ))
                    : undefined}

                  {/* End li */}
                </ul>
              </div>
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
