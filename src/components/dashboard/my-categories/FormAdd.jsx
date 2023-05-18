import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
// import categories from '../../../data/categories';

function FormAdd({ getData }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [nameVN, setNameVN] = useState('');
  // const [nameEN, setNameEN] = useState('');

  const accessToken = useSelector((state) => state.auth.accessToken);

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      categoryDetails: [
        { lang: 'VN', name: '' },
        { lang: 'EN', name: '' },
      ],
      categoryTypes: [
        {
          categoryTypeDetails: [
            { lang: 'VN', name: '' },
            { lang: 'EN', name: '' },
          ],
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'categoryTypes',
    keyName: 'categoryTypeKey',
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/lessor/category',
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      Swal.fire({
        icon: 'success',
        title: 'Tạo thành công!',
        showConfirmButton: false,
        timer: 1500,
      });
      getData();
      handleClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Đã xảy ra lỗi!',
        text: 'Vui lòng thử lại sau.',
        confirmButtonText: 'OK',
      });
      console.log(error);
    }
  };

  // const handleNameVNChange = (event) => {
  //   const selectedNameVN = event.target.value;
  //   setNameVN(selectedNameVN);

  //   // Tìm giá trị tương ứng trong `categories` dựa trên `nameVN` và cập nhật `nameEN` tương ứng
  //   const selectedCategory = categories.find(
  //     (item) => item.nameVN === selectedNameVN,
  //   );
  //   if (selectedCategory) {
  //     setNameEN(selectedCategory.nameEN);
  //   }
  // };

  return (
    <>
      <button
        className={`list-inline-item add_listing`}
        style={{
          border: 'none',
          backgroundColor: '#ee7b35',
          padding: '10px',
          color: 'white',
          borderRadius: '30px',
        }}
        onClick={handleShow}
      >
        <span className="flaticon-plus"></span>
        <span className="dn-lg"> Create Categories</span>
      </button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="formGroupExamplePrice">
                    Category Name:
                    <input
                      type="text"
                      required
                      {...register('categoryDetails.0.name')}
                      placeholder="VN"
                      className="form-control mb-2"
                      id="formGroupExamplePrice"
                    />
                    <input
                      type="text"
                      required
                      {...register('categoryDetails.1.name')}
                      placeholder="EN"
                      className="form-control"
                      id="formGroupExamplePrice"
                    />
                  </label>
                </div>
              </div>

              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="formGroupExamplePrice">
                    Category Type:
                    {fields.map((field, index) => (
                      <div key={field.categoryTypeKey}>
                        <input
                          type="text"
                          required
                          {...register(
                            `categoryTypes.${index}.categoryTypeDetails.0.name`,
                          )}
                          placeholder="VN"
                          className="form-control mb-2"
                          id="formGroupExamplePrice"
                        />
                        <input
                          type="text"
                          required
                          {...register(
                            `categoryTypes.${index}.categoryTypeDetails.1.name`,
                          )}
                          placeholder="EN"
                          className="form-control mb-2"
                          id="formGroupExamplePrice"
                        />
                        <div className="my_profile_setting_input overflow-hidden mb-2">
                          <button
                            type="button"
                            className="btn btn1"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </label>
                </div>
              </div>
            </div>
            <div className="my_profile_setting_input overflow-hidden mt20">
              <button
                type="button"
                className="btn btn3 float-start"
                onClick={() =>
                  append({
                    categoryTypeDetails: [
                      { lang: 'VN', name: '' },
                      { lang: 'EN', name: '' },
                    ],
                  })
                }
              >
                Add Category Type
              </button>
            </div>
            <div className="my_profile_setting_input overflow-hidden mt20">
              <button type="submit" className="btn btn2 float-end">
                Create
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FormAdd;
