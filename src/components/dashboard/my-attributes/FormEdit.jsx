import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import Swal from 'sweetalert2';
import useTrans from '../../../pages/hooks/useTran';

function FormEdit({ id, getData }) {
  const trans = useTrans();
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
    keyName: 'id',
  });

  const onSubmit = async (formData) => {
    try {
      const result = await Swal.fire({
        title: `${trans.lessor.xac_nhan_chinh}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: `${trans.lessor.xac_nhan}`,
        cancelButtonText: `${trans.huy_bo}`,
      });
      if (result.isConfirmed) {
        const res = await axios.patch(
          `http://localhost:5000/lessor/roomAttribute`,
          {
            id: id,
            roomAttributeDetails: formData.roomAttributeDetails.map((item) => ({
              id: item.id,
              lang: item.lang,
              name: item.name,
            })),
            roomAttributeTerms: formData.roomAttributeTerms.map((item) => ({
              id: item.id,
              roomAttributeTermDetails: item.roomAttributeTermDetails.map(
                (itemDetails) => ({
                  id: itemDetails.id,
                  lang: itemDetails.lang,
                  name: itemDetails.name,
                  slug: itemDetails.slug,
                }),
              ),
            })),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        // console.log(res.data); // log response data to the console
        Swal.fire({
          icon: 'success',
          title: `${trans.lessor.cap_nhat}`,
          showConfirmButton: false,
          timer: 1500,
        });
        getData();
        handleClose();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `${trans.lessor.loi}`,
        text: `${trans.lessor.loi_1}`,
        confirmButtonText: 'OK',
      });
      console.error(error);
    }
    // console.log(formData);
  };

  useEffect(() => {
    // Fetch category data here and set it to the form defaultValues
    const fetchCategory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/lessor/roomAttribute/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        reset(res.data);
        // console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategory();
  }, [accessToken, id]);

  return (
    <>
      <span className="flaticon-edit" onClick={handleShow}></span>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Attributes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="formGroupExamplePrice">
                    {trans.lessor.attributes.ten_tien_ich}:
                    <input
                      className="form-control mb-2"
                      id="formGroupExamplePrice"
                      type="text"
                      {...register('roomAttributeDetails.0.name')}
                    />
                    <input
                      className="form-control mb-2"
                      id="formGroupExamplePrice"
                      type="text"
                      {...register('roomAttributeDetails.1.name')}
                    />
                  </label>
                </div>
              </div>
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="formGroupExamplePrice">
                    {trans.lessor.attributes.loai_tien_ich}:
                    {fields.map((roomAttributeTerm, index) => (
                      <div key={roomAttributeTerm.id}>
                        <input
                          className="form-control mb-2"
                          id="formGroupExamplePrice"
                          type="text"
                          {...register(
                            `roomAttributeTerms.${index}.roomAttributeTermDetails.${0}.name`,
                          )}
                          placeholder="VN"
                          defaultValue={
                            roomAttributeTerm.roomAttributeTermDetails?.[0]
                              ?.name
                          }
                        />
                        <input
                          className="form-control mb-2"
                          id="formGroupExamplePrice"
                          type="text"
                          {...register(
                            `roomAttributeTerms.${index}.roomAttributeTermDetails.${0}.slug`,
                          )}
                          placeholder="Slug VN"
                          defaultValue={
                            roomAttributeTerm.roomAttributeTermDetails?.[0]
                              ?.slug
                          }
                        />
                        <input
                          className="form-control mb-2"
                          id="formGroupExamplePrice"
                          type="text"
                          {...register(
                            `roomAttributeTerms.${index}.roomAttributeTermDetails.${1}.name`,
                          )}
                          placeholder="EN"
                          defaultValue={
                            roomAttributeTerm.roomAttributeTermDetails?.[1]
                              ?.name
                          }
                        />
                        <input
                          className="form-control mb-2"
                          id="formGroupExamplePrice"
                          type="text"
                          {...register(
                            `roomAttributeTerms.${index}.roomAttributeTermDetails.${1}.slug`,
                          )}
                          placeholder="Slug EN"
                          defaultValue={
                            roomAttributeTerm.roomAttributeTermDetails?.[1]
                              ?.slug
                          }
                        />
                        <div className="my_profile_setting_input overflow-hidden mb-2">
                          <button
                            type="button"
                            className="btn btn1"
                            onClick={() => remove(index)}
                          >
                            {trans.lessor.xoa}
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
                {trans.lessor.attributes.them_loai_tien_ich}
              </button>
            </div>
            <div className="my_profile_setting_input overflow-hidden mt20">
              <button type="submit" className="btn btn2 float-end">
                Edit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FormEdit;
