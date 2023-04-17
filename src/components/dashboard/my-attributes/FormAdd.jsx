import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

function FormAdd({getData}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const accessToken = useSelector((state) => state.auth.accessToken);

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      roomAttributeDetails: [
        { lang: "VN", name: "" },
        { lang: "EN", name: "" },
      ],
      roomAttributeTerms: [
        {
          roomAttributeTermDetails: [
            { lang: "VN", name: "", slug: "" },
            { lang: "EN", name: "", slug: "" },
          ],
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "roomAttributeTerms",
    keyName: "roomAttributeTermKey",
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/lessor/roomAttribute",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      reset();
      getData();
      handleClose();
    } catch (error) {
      console.log(error);
    }
    // console.log(data);
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
        <span className="dn-lg"> Create Attributes</span>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              Attribute Name:
              <input
                type="text"
                {...register("roomAttributeDetails.0.name")}
                placeholder="VN"
              />
              <input
                type="text"
                {...register("roomAttributeDetails.1.name")}
                placeholder="EN"
              />
            </label>
            <br />
            <label>
            Attribute Term:
              {fields.map((field, index) => (
                <div key={field.roomAttributeTermKey}>
                  <input
                    type="text"
                    {...register(
                      `roomAttributeTerms.${index}.roomAttributeTermDetails.0.name`
                    )}
                    placeholder="VN"
                  />
                  <input
                    type="text"
                    {...register(
                      `roomAttributeTerms.${index}.roomAttributeTermDetails.0.slug`
                    )}
                    placeholder="Slug VN"
                  />
                  <input
                    type="text"
                    {...register(
                      `roomAttributeTerms.${index}.roomAttributeTermDetails.1.name`
                    )}
                    placeholder="EN"
                  />
                  <input
                    type="text"
                    {...register(
                      `roomAttributeTerms.${index}.roomAttributeTermDetails.1.slug`
                    )}
                    placeholder="Slug EN"
                  />
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  append({
                    roomAttributeTermDetails: [
                      { lang: "VN", name: "", slug: "" },
                      { lang: "EN", name: "", slug: "" },
                    ],
                  })
                }
              >
                Add Attribute Term
              </button>
            </label>
            <br />
            <Button variant="primary" type="submit">Create</Button>
          </form>
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

export default FormAdd;
