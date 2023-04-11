import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function FormEdit(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <span className="flaticon-edit" onClick={handleShow}></span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            cumque quod reiciendis nemo dolores laudantium necessitatibus quis
            qui, ipsum tenetur quibusdam incidunt consequatur odio neque
            doloremque, natus, delectus nesciunt illo!
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
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { useSelector } from "react-redux";

// function FormEdit(props) {
//   const [show, setShow] = useState(false);
//   const [category, setCategory] = useState({});
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const accessToken = useSelector((state) => state.auth.accessToken);

//   const handleEdit = async () => {
//     try {
//       const res = await axios.patch(`http://localhost:5000/lessor/category/${props.id}`, category, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       });
//       console.log(res.data); // log response data to the console
//       handleClose();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCategory((prevCategory) => ({
//       ...prevCategory,
//       [name]: value
//     }));
//   };

//   useEffect(() => {
//     // Fetch category data here and set it to the category state
//     const fetchCategory = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/lessor/category/${props.id}`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`
//           }
//         });
//         setCategory(res.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchCategory();
//   }, [accessToken, props.id]);

//   return (
//     <>
//       <span className="flaticon-edit" onClick={handleShow}></span>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Categories</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form>
//             <label htmlFor="name">Name:{category.categoryDetails.map((categoryDetails,i)=>(<h4 key={i}>{categoryDetails.name}</h4>))}</label>
//             <br />
//             <label htmlFor="lang">Language:{category.categoryDetails.map((categoryDetails,i)=>(<h4 key={i}>{categoryDetails.lang}</h4>))}</label>
//             <br />
//             <label htmlFor="categoryTypeDetails">Category Type Details:</label>
//             <input
//               type="text"
//               name="categoryTypeDetails"
//               value={category.categoryTypes[0]?.categoryTypeDetails[0]?.name || ''}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="categoryTypeDetails"
//               value={category.categoryTypes[0]?.categoryTypeDetails[1]?.name || ''}
//               onChange={handleChange}
//             />
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleEdit}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default FormEdit;
