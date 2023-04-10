// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

// function FormEdit(props) {
//   const [show, setShow] = useState(false);
//   const [data, setData] = useState({});
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const { register, control, handleSubmit, reset, watch } = useForm({
//     defaultValues: {
//       test: [{ firstName: "Bill", lastName: "Luo" }],
//     },
//   });
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "test",
//   });

//   const editCategoryDetails = async (updatedData) => {
//     try {
//       const res = await axios.patch(
//         `http://localhost:5000/lessor/category/${props.id}`,
//         updatedData,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       console.log(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const onSubmit = (data) => {
//     const updatedData = {
//       categoryDetails: [
//         {
//           id: data.categoryDetails[0].id,
//           lang: data.categoryDetails[0].lang,
//           name: data.categoryDetails[0].name,
//         },
//         {
//           id: data.categoryDetails[1].id,
//           lang: data.categoryDetails[1].lang,
//           name: data.categoryDetails[1].name,
//         },
//       ],
//       categoryTypes: [
//         {
//           categoryTypeDetails: [
//             {
//               id: data.categoryTypes[0].categoryTypeDetails[0].id,
//               lang: data.categoryTypes[0].categoryTypeDetails[0].lang,
//               name: data.categoryTypes[0].categoryTypeDetails[0].name,
//             },
//           ],
//           id: data.categoryTypes[0].id,
//         },
//       ],
//     };

//     editCategoryDetails(updatedData);
//   };

//   return (
//     <>
//       <span className="flaticon-edit" onClick={handleShow}></span>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Categories</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <h1>Field Array </h1>
//             <p>The following demo allow you to delete, append, prepend items</p>
//             <ul>
//               {fields.map((item, index) => {
//                 return (
//                   <li key={item.id}>
//                     <input
//                       {...register(`test.${index}.firstName`, {
//                         required: true,
//                       })}
//                     />

//                     <Controller
//                       render={({ field }) => <input {...field} />}
//                       name={`test.${index}.lastName`}
//                       control={control}
//                     />
//                     <button type="button" onClick={() => remove(index)}>
//                       Delete
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//             <section>
//               <button
//                 type="button"
//                 onClick={() => {
//                   append({ firstName: "appendBill", lastName: "appendLuo" });
//                 }}
//               >
//                 Append
//               </button>
//               <button
//                 type="button"
//                 onClick={() =>
//                   reset({
//                     test: [{ firstName: "Bill", lastName: "Luo" }],
//                   })
//                 }
//               >
//                 Reset
//               </button>
//             </section>

//             <Button variant="primary" onSubmit={handleSubmit(onSubmit)}>
//               Save Changes
//             </Button>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default FormEdit;
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useSelector } from "react-redux";

function FormEdit(props) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      categoryDetails: data.categoryDetails || [],
      categoryTypes: data.categoryTypes || [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "categoryDetails",
  });
  const {
    fields: typeFields,
    append: typeAppend,
    remove: typeRemove,
  } = useFieldArray({
    control,
    name: "categoryTypes",
  });

  const onSubmit = async (data) => {
    try {
      await axios.patch(
        `http://localhost:5000/lessor/category/${props.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

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
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>Category Details</h1>
              <p>Use the following fields to edit the category details:</p>
              <ul>
                {fields.map((item, index) => {
                  return (
                    <li key={item.id}>
                      <input
                        {...register(`categoryDetails.${index}.name`, {
                          required: true,
                        })}
                        defaultValue={item.name}
                      />
                      <input
                        {...register(`categoryDetails.${index}.lang`, {
                          required: true,
                        })}
                        defaultValue={item.lang}
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
                    append({ name: "", lang: "" });
                  }}
                >
                  Add Category Detail
                </button>
              </section>

              <h1>Category Types</h1>
              <p>Use the following fields to edit the category types:</p>
              <ul>
                {typeFields.map((item, index) => {
                  return (
                    <li key={item.id}>
                      <input
                        {...register(
                          `categoryTypes.${index}.categoryTypeDetails.${0}.name`,
                          {
                            required: true,
                          }
                        )}
                        defaultValue={item.categoryTypeDetails[0].name}
                      />
                      <input
                        {...register(
                          `categoryTypes.${index}.categoryTypeDetails.${0}.lang`,
                          {
                            required: true,
                          }
                        )}
                        defaultValue={item.categoryTypeDetails[0].lang}
                      />
                      <button type="button" onClick={() => typeRemove(index)}>
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
                    typeAppend({
                      categoryTypeDetails: [{ name: "", lang: "" }],
                    });
                  }}
                >
                  Add Category Type
                </button>
              </section>

              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </form>
          </Modal.Body>
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
