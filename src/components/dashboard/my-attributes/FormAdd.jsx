import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

function FormAdd({ getData }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const accessToken = useSelector((state) => state.auth.accessToken);

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      roomAttributeDetails: [
        { lang: 'VN', name: '' },
        { lang: 'EN', name: '' },
      ],
      roomAttributeTerms: [
        {
          roomAttributeTermDetails: [
            { lang: 'VN', name: '', slug: '' },
            { lang: 'EN', name: '', slug: '' },
          ],
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'roomAttributeTerms',
    keyName: 'roomAttributeTermKey',
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/lessor/roomAttribute',
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      reset();
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
    // console.log(data);
  };

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
        <span className="dn-lg"> Create Attributes</span>
      </button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Attributes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="formGroupExamplePrice">
                    Attribute Name:
                    <input
                      type="text"
                      {...register('roomAttributeDetails.0.name')}
                      placeholder="VN"
                      className="form-control mb-2"
                      id="formGroupExamplePrice"
                    />
                    <input
                      type="text"
                      {...register('roomAttributeDetails.1.name')}
                      placeholder="EN"
                      className="form-control mb-2"
                      id="formGroupExamplePrice"
                    />
                  </label>
                </div>
              </div>
              <div className="col-lg-6 col-xl-6">
                <div lassName="my_profile_setting_input form-group">
                  <label htmlFor="formGroupExamplePrice">
                    Attribute Term:
                    {fields.map((field, index) => (
                      <div key={field.roomAttributeTermKey}>
                        <input
                          type="text"
                          {...register(
                            `roomAttributeTerms.${index}.roomAttributeTermDetails.0.name`,
                          )}
                          placeholder="VN"
                          className="form-control mb-2"
                          id="formGroupExamplePrice"
                        />
                        <input
                          type="text"
                          {...register(
                            `roomAttributeTerms.${index}.roomAttributeTermDetails.0.slug`,
                          )}
                          placeholder="Slug VN"
                          className="form-control mb-2"
                          id="formGroupExamplePrice"
                        />
                        <input
                          type="text"
                          {...register(
                            `roomAttributeTerms.${index}.roomAttributeTermDetails.1.name`,
                          )}
                          placeholder="EN"
                          className="form-control mb-2"
                          id="formGroupExamplePrice"
                        />
                        <input
                          type="text"
                          {...register(
                            `roomAttributeTerms.${index}.roomAttributeTermDetails.1.slug`,
                          )}
                          placeholder="Slug EN"
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
            <div className="my_profile_setting_input overflow-hidden mb-2">
              <button
                className="btn btn3"
                type="button"
                onClick={() =>
                  append({
                    roomAttributeTermDetails: [
                      { lang: 'VN', name: '', slug: '' },
                      { lang: 'EN', name: '', slug: '' },
                    ],
                  })
                }
              >
                Add Attribute Term
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
