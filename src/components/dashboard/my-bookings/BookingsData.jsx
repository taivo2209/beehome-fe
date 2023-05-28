import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FormEdit from './FormEdit';
import Pagination from '../../common/Pagination';
import FormView from './FormView';
import useTrans from '../../../pages/hooks/useTran';

const BookingsData = () => {
  const trans = useTrans();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/lessor/book?page=${currentPage}&limit=5`,
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
    if (status === 'DONE' || status === 'APPROVED') {
      return 'text-success';
    } else if (status === 'MISSING') {
      return 'text-danger';
    } else {
      return 'text-warning';
    }
  };

  const tranStatus = (status) => {
    if (status === 'PROCESSING') {
      return `${trans.lessor.bookings.dang_cho}`;
    } else if (status === 'APPROVED') {
      return `${trans.lessor.bookings.da_xn}`;
    } else if (status === 'DONE') {
      return `${trans.lessor.bookings.hoan_thanh}`;
    } else if (status === 'MISSING') {
      return `${trans.lessor.bookings.lo_hen}`;
    } else {
      return status;
    }
  };

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">{trans.lessor.bookings.lich_hen}</th>
            <th className="dn-lg" scope="col"></th>
            <th scope="col"></th>
            <th scope="col">{trans.lessor.bookings.tinh_trang}</th>
            <th scope="col">{trans.lessor.hanh_dong}</th>
          </tr>
        </thead>
        {/* End thead */}

        <tbody>
          {data?.items &&
            data?.items?.map((item) => (
              <tr key={item.id} className="title" scope="row">
                <td>{item.phoneNumber}</td>
                <td className="dn-lg"></td>
                <td></td>
                <td className={getStatusColor(item.status)}>{tranStatus(item.status)}</td>
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
                        <FormView id={item.id} />
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
                    {/* <li
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
                    </li> */}
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

export default BookingsData;
