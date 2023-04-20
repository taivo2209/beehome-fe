import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";

function FormEdit(props) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      id: props.id,
      categoryDetails: [
        { id: null, lang: "VN", name: "" },
        { id: null, lang: "EN", name: "" },
      ],
      categoryTypes: [
        {
          categoryTypeDetails: [
            { id: null, lang: "VN", name: "" },
            { id: null, lang: "EN", name: "" },
          ],
          id: null,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "categoryTypes",
    keyName: "id",
  });

  const onSubmit = async (formData) => {
    // try {
    //   const res = await axios.patch(
    //     `http://localhost:5000/lessor/category`,
    //     {
    //       id: props.id,
    //       categoryDetails: formData.categoryDetails.map((item) => ({
    //         id: item.id,
    //         lang: item.lang,
    //         name: item.name,
    //       })),
    //       categoryTypes: formData.categoryTypes.map((item) => ({
    //         id: item.id,
    //         categoryTypeDetails: item.categoryTypeDetails.map(
    //           (itemDetails) => ({
    //             id: itemDetails.id,
    //             lang: itemDetails.lang,
    //             name: itemDetails.name,
    //           })
    //         ),
    //       })),
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     }
    //   );
    //   console.log(res.data); // log response data to the console
    //   handleClose();
    // } catch (error) {
    //   console.error(error);
    // }
    // console.log(formData);
  };

  // useEffect(() => {
  //   // Fetch category data here and set it to the form defaultValues
  //   const fetchCategory = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:5000/lessor/category/${props.id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );
  //       reset(res.data);
  //       // console.log(res.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchCategory();
  // }, [accessToken, props.id]);

  return (
    <>
      <span className="flaticon-edit" onClick={handleShow}></span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              Category Name:
              <input type="text" {...register("categoryDetails.0.name")} />
              <input type="text" {...register("categoryDetails.1.name")} />
            </label>
            <label>
              Category Type:
              {fields.map((categoryType, index) => (
                <div key={categoryType.id}>
                  <input
                    type="text"
                    {...register(
                      `categoryTypes.${index}.categoryTypeDetails.${0}.name`
                    )}
                    defaultValue={categoryType.categoryTypeDetails[0].name}
                  />
                  <input
                    type="text"
                    {...register(
                      `categoryTypes.${index}.categoryTypeDetails.${1}.name`
                    )}
                    defaultValue={categoryType.categoryTypeDetails[1].name}
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

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </form> */}
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

export default FormEdit;