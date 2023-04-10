import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function FormView(props) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/lessor/category/${props.data}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setData(res.data);
      // console.log(accessToken);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <span className="flaticon-view" onClick={handleShow}></span>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormView;
