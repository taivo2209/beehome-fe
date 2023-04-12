import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

function FormAdd() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const accessToken = useSelector((state) => state.auth.accessToken);

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      categoryDetails: [
        { lang: "VN", name: "" },
        { lang: "EN", name: "" },
      ],
      categoryTypes: [
        {
          categoryTypeDetails: [
            { lang: "VN", name: "" },
            { lang: "EN", name: "" },
          ],
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "categoryTypes",
    keyName: "categoryTypeKey",
  });

  const onSubmit = async (data) => {
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
      // reset();
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
        <span className="dn-lg"> Create Categories</span>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              Category Name:
              <input
                type="text"
                {...register("categoryDetails.0.name")}
                placeholder="VN"
              />
              <input
                type="text"
                {...register("categoryDetails.1.name")}
                placeholder="EN"
              />
            </label>
            <br />
            <label>
              Category Type:
              {fields.map((field, index) => (
                <div key={field.categoryTypeKey}>
                  <input
                    type="text"
                    {...register(
                      `categoryTypes.${index}.categoryTypeDetails.0.name`
                    )}
                    placeholder="VN"
                  />
                  <input
                    type="text"
                    {...register(
                      `categoryTypes.${index}.categoryTypeDetails.1.name`
                    )}
                    placeholder="EN"
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
                    categoryTypeDetails: [
                      { lang: "VN", name: "" },
                      { lang: "EN", name: "" },
                    ],
                  })
                }
              >
                Add Category Type
              </button>
            </label>
            <br />
            <button type="submit">Save Changes</button>
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
