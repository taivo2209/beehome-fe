import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import useTrans from '../../../pages/hooks/useTran';
import { useRouter } from 'next/router';

function FormPayment({ title, member, price }) {
  const router = useRouter();
  const trans = useTrans();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [link, setLink] = useState();

  const paymentVNPay = async () => {
    const formData = {
      amount: String(price),
      packType: title,
    };
    try {
      const res = await axios.post(
        'http://localhost:5000/vn-pay/create_payment_url',
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setLink(res.data);
      router.push(link);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <span onClick={handleShow}>
        {member === title
          ? `${trans.lessor.membership.goi_ht}`
          : `${trans.lessor.membership.chon}`}
      </span>
      <Modal show={show} onHide={handleClose} centered>
        {/* <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="package">Gói đang chọn: </label>
                <h3 className="form-control" id="package">
                  {title}
                </h3>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="price">Giá: </label>
                <h3 className="form-control" id="price">
                  {String(price).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                </h3>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="my_profile_setting_input overflow-hidden mt20">
              <button className="btn btn2" onClick={paymentVNPay}>
                Thanh toán
              </button>
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

export default FormPayment;
