import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

function FormEdit(props) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      test: [{ firstName: "Bill", lastName: "Luo" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  const onSubmit = (data) => console.log("data", data);

  const getData = async () => {
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
      console.log(data);
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
      <span className="flaticon-edit" onClick={handleShow}></span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Field Array </h1>
            <p>The following demo allow you to delete, append, prepend items</p>
            <ul>
              {fields.map((item, index) => {
                return (
                  <li key={item.id}>
                    <input
                      {...register(`test.${index}.firstName`, {
                        required: true,
                      })}
                    />

                    <Controller
                      render={({ field }) => <input {...field} />}
                      name={`test.${index}.lastName`}
                      control={control}
                    />
                    <button type="button" onClick={() => remove(index)}>
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
            <section>
              <button
                type="button"
                onClick={() => {
                  append({ firstName: "appendBill", lastName: "appendLuo" });
                }}
              >
                Append
              </button>
              <button
                type="button"
                onClick={() =>
                  reset({
                    test: [{ firstName: "Bill", lastName: "Luo" }],
                  })
                }
              >
                Reset
              </button>
            </section>

            <Button variant="primary" onSubmit={handleSubmit(onSubmit)}>
              Save Changes
            </Button>
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

export default FormEdit;
