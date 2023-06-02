import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

function FormView({ id }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/admin/lessor/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(res.data.lessor);
      // console.log(accessToken);
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
          <Modal.Title>Lessor Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="formGroupExamplePrice">
                    Lessor&apos;s Name:
                  </label>
                  <p className="form-control" id="formGroupExamplePrice">
                    {data?.name}
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="formGroupExamplePrice1">
                    Lessor&apos;s Address:
                  </label>
                  <p className="form-control" id="formGroupExamplePrice1">
                    {data?.address}
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="formGroupExamplePrice2">
                    Lessor&apos;s Phone Number:
                  </label>
                  <p className="form-control" id="formGroupExamplePrice2">
                    {data?.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="formGroupExamplePrice2">
                    Lessor&apos;s Package:
                  </label>
                  <p className="form-control" id="formGroupExamplePrice2">
                    {data?.packType}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormView;
