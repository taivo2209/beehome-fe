import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

function FormEdit(props) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [categoryNameVN, setCategoryNameVN] = useState("");
  const [categoryNameEN, setCategoryNameEN] = useState("");
  const [categoryTypeVN, setCategoryTypeVN] = useState("");
  const [categoryTypeEN, setCategoryTypeEN] = useState("");

  const handleEdit = async () => {
    const formData = {
      id: data.id,
      categoryDetails: [
        {id: data.categoryDetails?.[0]?.id, lang: "VN", name: data.categoryDetails?.[0]?.name},
        {id: data.categoryDetails?.[1]?.id, lang: "EN", name: data.categoryDetails?.[1]?.name}
      ],
      categoryTypes: [
        {
          categoryTypeDetails: [
            {id: data.categoryTypes?.[0]?.categoryTypeDetails?.[0]?.id, lang: "VN", name: data.categoryTypes?.[0]?.categoryTypeDetails?.[0]?.name},
            {id: data.categoryTypes?.[0]?.categoryTypeDetails?.[1]?.id, lang: "VN", name: data.categoryTypes?.[0]?.categoryTypeDetails?.[1]?.name}
          ]
        }
      ],
      id: data.categoryTypes?.[0]?.id
    }
    try {
      const res = await axios.patch(`http://localhost:5000/lessor/category/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(res.data); // log response data to the console
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch category data here and set it to the category state
    const fetchCategory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/lessor/category/${props.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategory();
  }, [accessToken, props.id]);

  useEffect(() => {
    setCategoryNameVN(data.categoryDetails?.[0]?.name);
    setCategoryNameEN(data.categoryDetails?.[1]?.name);
    setCategoryTypeVN(data.categoryTypes?.[0]?.categoryTypeDetails?.[0]?.name);
    setCategoryTypeEN(data.categoryTypes?.[0]?.categoryTypeDetails?.[1]?.name);
  }, [data]);

  return (
    <>
      <span className="flaticon-edit" onClick={handleShow}></span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            Category Name:
            <input
              type="text"
              value={categoryNameVN}
              onChange={(event) => setCategoryNameVN(event.target.value)}
            />
            <input
              type="text"
              value={categoryNameEN}
              placeholder="EN"
              onChange={(event) => setCategoryNameEN(event.target.value)}
            />
          </label>
          <br />
          <label>
            Category Type:
            <input
              type="text"
              value={categoryTypeVN}
              onChange={(event) => setCategoryTypeVN(event.target.value)}
            />
            <input
              type="text"
              value={categoryTypeEN}
              onChange={(event) => setCategoryTypeEN(event.target.value)}
            />
          </label>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormEdit;
