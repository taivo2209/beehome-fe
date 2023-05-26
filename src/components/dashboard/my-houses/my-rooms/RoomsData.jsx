import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CreateRooms from './CreateRooms';
import { useSelector } from 'react-redux';
import axios from 'axios';
import FormView from './FormView';
import FormEdit from './FormEdit';
import Swal from 'sweetalert2';
import Pagination from '../../../common/Pagination';
import useTrans from '../../../../pages/hooks/useTran';

function RoomsData({ floorData, province, district, ward }) {
  const trans = useTrans();
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const [roomData, setRoomData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/lessor/floor/${floorData.id}?page=${currentPage}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setRoomData(res.data?.items);
      setData(res.data);
      // console.log('room',res.data);
      // console.log(accessToken);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (roomId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/lessor/room/${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      // console.log(res.data);
      // Call getData() again to update the table after deletion
      getData();
      Swal.fire({
        icon: 'success',
        title: 'Xóa thành công!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handlePageChange(currentPage);
    getData();
  }, [floorData.id, accessToken, currentPage]);

  return (
    <>
      <span className="floor-items" onClick={handleShow}>
        {floorData.floorNumber}{' '}
      </span>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Thông tin tầng {floorData.floorNumber}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <div className="row">
              <div className="col-lg-12">
                <div className="my_dashboard_review mb40">
                  <div className="col-lg-12">
                    <div className="savesearched_table">
                      <div className="table-responsive mt0">
                        <div className="col-md-4 col-lg-4 col-xl-3 mb20">
                          <ul className="sasw_list mb0">
                            <CreateRooms
                              floorId={floorData.id}
                              updateData={getData}
                              province={province}
                              district={district}
                              ward={ward}
                            />
                          </ul>
                        </div>
                        <table className="table">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">{trans.lessor.rooms.phong}</th>
                              <th className="dn-lg" scope="col"></th>
                              <th className="dn-lg" scope="col"></th>
                              <th scope="col"></th>
                              <th scope="col"></th>
                              <th scope="col">{trans.lessor.duoc_tao}</th>
                              <th scope="col">{trans.lessor.hanh_dong}</th>
                            </tr>
                          </thead>
                          {/* End thead */}

                          <tbody>
                            {roomData?.[0]?.rooms &&
                              roomData?.[0]?.rooms.map((room) => (
                                <tr key={room.id} className="title" scope="row">
                                  <td>{room.name}</td>
                                  <td className="dn-lg"></td>
                                  <td className="dn-lg"></td>
                                  <td></td>
                                  <td></td>
                                  <td className="para">
                                    {new Date(
                                      room.createdAt,
                                    ).toLocaleDateString()}
                                  </td>
                                  <td>
                                    <ul className="view_edit_delete_list mb0">
                                      <li
                                        className="list-inline-item"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="View"
                                      >
                                        <a href="#">
                                          {/* <span className="flaticon-view"></span> */}
                                          <FormView
                                            id={room.id}
                                            getNewData={getData}
                                          />
                                          {/* {console.log(item.categoryId)} */}
                                        </a>
                                      </li>
                                      <li
                                        className="list-inline-item"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Edit"
                                      >
                                        <a href="#">
                                          {/* <span className="flaticon-edit"></span> */}
                                          <FormEdit
                                            id={room.id}
                                            updateData={getData}
                                          />
                                        </a>
                                      </li>
                                      <li
                                        className="list-inline-item"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Delete"
                                      >
                                        <a href="#">
                                          <span
                                            className="flaticon-garbage"
                                            onClick={() =>
                                              handleDelete(room.id)
                                            }
                                          ></span>
                                        </a>
                                      </li>
                                    </ul>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                          {/* End tbody */}
                        </table>
                        <div className="mbp_pagination">
                          <Pagination
                            pageSize={data?.meta?.totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                          />
                        </div>
                      </div>
                    </div>
                    {/* End .packages_table */}
                  </div>
                </div>
              </div>
            </div>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RoomsData;
