import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

function FormAdd() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [categoryNameVN, setCategoryNameVN] = useState("");
  const [categoryNameEN, setCategoryNameEN] = useState("");
  const [categoryTypeVN, setCategoryTypeVN] = useState("");
  const [categoryTypeEN, setCategoryTypeEN] = useState("");
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/lessor/category/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    getData();
  },[])

  const handleSaveChanges = async () => {
    const data = {
      categoryDetails: [
        { lang: "VN", name: categoryNameVN },
        { lang: "EN", name: categoryNameEN },
      ],
      categoryTypes: [
        {
          categoryTypeDetails: [
            { lang: "VN", name: categoryTypeVN },
            { lang: "EN", name: categoryTypeEN },
          ],
        },
      ],
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/lessor/category",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      getData()
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <>
      <button
        className={`list-inline-item add_listing`}
        style={{
          border: "none",
          backgroundColor: "#ee7b35",
          padding: "10px",
          color: "white",
          borderRadius: "30px",
        }}
        onClick={handleShow}
      >
        <span className="flaticon-plus"></span>
        <span className="dn-lg"> Create Categories</span>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            Category Name:
            <input
              type="text"
              value={categoryNameVN}
              onChange={(event) => setCategoryNameVN(event.target.value)}
              placeholder="VN"
            />
            <input
              type="text"
              value={categoryNameEN}
              onChange={(event) => setCategoryNameEN(event.target.value)}
              placeholder="EN"
            />
          </label>
          <br />
          <label>
            Category Type:
            <input
              type="text"
              value={categoryTypeVN}
              onChange={(event) => setCategoryTypeVN(event.target.value)}
              placeholder="VN"
            />
            <input
              type="text"
              value={categoryTypeEN}
              onChange={(event) => setCategoryTypeEN(event.target.value)}
              placeholder="EN"
            />
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormAdd;
