import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import useTrans from '../../../pages/hooks/useTran';

function FormView(props) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const trans = useTrans();
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const date = new Date(data?.dateMeet);
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh',
  };
  const localDateTimeString = date.toLocaleString('vi-VN', options);

  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/lessor/book/${props.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setData(res.data);
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
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-lg-12">
            <div className="my_dashboard_review">
              <div className="row">
                <div className="col-lg-6 col-xl-6">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExamplePrice">
                      {trans.lessor.bookings.ten_ng_hen}
                    </label>
                    <p className="form-control" id="formGroupExamplePrice">
                      {data?.firstName} {data?.lastName}
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-6">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExamplePrice1">
                      {trans.lessor.bookings.phong_muon_xem}
                    </label>
                    <p className="form-control" id="formGroupExamplePrice1">
                      {data?.room?.name}
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-6">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExamplePrice2">
                      {trans.lessor.bookings.sdt}
                    </label>
                    <p className="form-control" id="formGroupExamplePrice2">
                      {data?.phoneNumber}
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-6">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExamplePrice3">Email</label>
                    <p className="form-control" id="formGroupExamplePrice3">
                      {data?.email}
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-6">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExamplePrice4">
                      {trans.lessor.bookings.ngay_hen}
                    </label>
                    <p className="form-control" id="formGroupExamplePrice4">
                      {new Date(data?.dateMeet).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-6">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExamplePrice5">
                      {trans.lessor.bookings.gio_hen}
                    </label>
                    <p className="form-control" id="formGroupExamplePrice5">
                      {localDateTimeString}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
