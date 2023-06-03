import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormView from './FormView';
import FormEdit from './FormEdit';
import Swal from 'sweetalert2';
import Pagination from '../../common/Pagination';

const ReportsData = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  // const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/report?page=${currentPage}&limit=10`,
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
  }, [currentPage]);

  const getStatusColor = (status) => {
    if (status === 'PROCESSING') {
      return 'text-warning';
    } else {
      return 'text-success';
    }
  };

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Post Reported</th>
            <th className="dn-lg" scope="col"></th>
            <th className="dn-lg" scope="col"></th>
            <th scope="col"></th>
            <th scope="col">Date Report</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {/* End thead */}

        <tbody>
          {data?.items &&
            data?.items?.map((item) => (
              <tr key={item?.id} className="title" scope="row">
                <td>{item?.boardingHouse?.name}</td>
                <td className="dn-lg"></td>
                <td className="dn-lg"></td>
                <td></td>
                <td>{new Date(item?.dateReport).toLocaleDateString()}</td>
                <td className={getStatusColor(item?.status)}>{item.status}</td>
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
                        <FormView id={item?.id} />
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
                        <FormEdit id={item?.id} getData={getData} />
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

export default ReportsData;
