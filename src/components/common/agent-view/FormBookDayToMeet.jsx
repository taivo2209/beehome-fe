import React from 'react';
import Button from 'react-bootstrap/Button';

function FormInfoBookDayToMeet({ id, getData }) {
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // const [name, setName] = useState('');
  // const [slug, setSlug] = useState('');
  // const [description, setDescription] = useState('');

  // const accessToken = useSelector((state) => state.auth.accessToken);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = {
  //     name: name,
  //     slug: slug,
  //     description: description,
  //   };
  //   try {
  //     const res = await axios.patch(
  //       `http://localhost:5000/lessor/tag/${id}`,
  //       data,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       },
  //     );
  //     // reset();
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Sửa thành công!',
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     getData();
  //     handleClose();
  //   } catch (error) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Đã xảy ra lỗi!',
  //       text: 'Vui lòng thử lại sau.',
  //       confirmButtonText: 'OK',
  //     });
  //     console.log(error);
  //   }
  //   // console.log(data);
  // };

  return (
    <>
      <form

      // onSubmit={handleSubmit}
      >
        <div className="input-group mb-2 mr-sm-2">
          <input
            type="text"
            className="form-control"
            // onChange={(e) => setName(e.target.value)}
            required
            placeholder="Tag Name"
          />
        </div>
        <div className="input-group form-group mb-2 mr-sm-2">
          <input
            type="text"
            className="form-control"
            required
            placeholder="Tag Slug"
            // onChange={(e) => setSlug(e.target.value)}
          />
        </div>
        <div className="input-group form-group mb-2 mr-sm-2">
          <input
            type="text"
            className="form-control"
            required
            placeholder="Tag Description"
            // onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button variant="primary" type="submit">
          Edit
        </Button>
      </form>
    </>
  );
}

export default FormInfoBookDayToMeet;
