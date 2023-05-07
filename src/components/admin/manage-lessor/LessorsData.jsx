import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormView from './FormView';
import FormEdit from './FormEdit';
import Swal from 'sweetalert2';
import Pagination from '../../common/Pagination';

const LessorsData = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/lessor?page=${currentPage}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setData(res.data);
      // dispatch(setCategories(res.data.items));
      // console.log(accessToken);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    handlePageChange(currentPage);
    getData();
  }, []);

  const handleDelete = async (lessorId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/admin/lessor/${lessorId}`,
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

  const getStatusColor = (status) => {
    if (status === 'VERIFIED' || status === 'APPROVED') {
      return 'text-success';
    } else {
      return 'text-danger';
    }
  };

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Lessor</th>
            <th className="dn-lg" scope="col"></th>
            <th className="dn-lg" scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {/* End thead */}

        <tbody>
          {data.items &&
            data.items.map((item) => (
              <tr key={item.id} className="title" scope="row">
                <td>{item.email}</td>
                <td className="dn-lg"></td>
                <td className="dn-lg"></td>
                <td></td>
                <td></td>
                <td className={getStatusColor(item.status)}>{item.status}</td>
                <td>
                  <ul className="view_edit_delete_list mb0">
                    <li
                      className="list-inline-item"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="View"
                    >
                      <a href="#">
                        <span className="flaticon-view"></span>
                        {/* <FormView id={item.id} /> */}
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
                        <FormEdit id={item.id} getData={getData} />
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
                          onClick={() => handleDelete(item.id)}
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
    </>
  );
};

export default LessorsData;
