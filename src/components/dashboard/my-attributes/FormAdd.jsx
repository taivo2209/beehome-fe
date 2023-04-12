// import axios from "axios";
// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { useSelector } from "react-redux";

// function FormAdd() {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const accessToken = useSelector((state) => state.auth.accessToken);
//   const [attributeNameVN, setAttributeNameVN] = useState("");
//   const [attributeNameEN, setAttributeNameEN] = useState("");
//   const [attributeTermVN, setAttributeTermVN] = useState("");
//   const [attributeTermEN, setAttributeTermEN] = useState("");
//   const [attributeSlugVN, setAttributeSlugVN] = useState("");
//   const [attributeSlugEN, setAttributeSlugEN] = useState("");

//   const handleSaveChanges = async () => {
//     const data = {
//       roomAttributeDetails: [
//         { lang: "VN", name: attributeNameVN },
//         { lang: "EN", name: attributeNameEN },
//       ],
//       roomAttributeTerms: [
//         {
//           roomAttributeTermDetails: [
//             { lang: "VN", name: attributeTermVN, slug: attributeSlugVN },
//             { lang: "EN", name: attributeTermEN, slug: attributeSlugEN },
//           ],
//         },
//       ],
//     };
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/lessor/roomAttribute",
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <>
//       <button
//         className={`list-inline-item add_listing`}
//         style={{
//           border: "none",
//           backgroundColor: "#ee7b35",
//           padding: "10px",
//           color: "white",
//           borderRadius: "30px",
//         }}
//         onClick={handleShow}
//       >
//         <span className="flaticon-plus"></span>
//         <span className="dn-lg"> Create Attributes</span>
//       </button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Attribute</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <label>
//           Attribute Name:
//             <input
//               type="text"
//               value={attributeNameVN}
//               onChange={(event) => setAttributeNameVN(event.target.value)}
//               placeholder="VN"
//             />
//             <input
//               type="text"
//               value={attributeNameEN}
//               onChange={(event) => setAttributeNameEN(event.target.value)}
//               placeholder="EN"
//             />
//           </label>
//           <br />
//           <label>
//             Attribute Term:
//             <input
//               type="text"
//               value={attributeTermVN}
//               onChange={(event) => setAttributeTermVN(event.target.value)}
//               placeholder="VN"
//             />
//             <input
//               type="text"
//               value={attributeTermEN}
//               onChange={(event) => setAttributeTermEN(event.target.value)}
//               placeholder="EN"
//             />
//           </label>
//           <br />
//           <label>
//             Slug:
//             <input
//               type="text"
//               value={attributeSlugVN}
//               onChange={(event) => setAttributeSlugVN(event.target.value)}
//               placeholder="VN"
//             />
//             <input
//               type="text"
//               value={attributeSlugEN}
//               onChange={(event) => setAttributeSlugEN(event.target.value)}
//               placeholder="EN"
//             />
//           </label>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSaveChanges}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default FormAdd;

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
