import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FormView from './FormView';
import FormEdit from './FormEdit';
import Swal from 'sweetalert2';
import Pagination from '../../common/Pagination';
import useTrans from '../../../pages/hooks/useTran';

// import { setCategories } from '../../../features/categories/categoriesSlice';

const HousesData = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const endDate = useSelector((state) => state.auth.endDate);
  // console.log('====', endDate);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const trans = useTrans();
  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/boardingHouse?page=${currentPage}&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setData(res.data);
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
    if (status === 'ACTIVE') {
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
            <th scope="col">{trans.lessor.sidebar.nha}</th>
            <th className="dn-lg" scope="col"></th>
            <th className="dn-lg" scope="col"></th>
            <th scope="col">{trans.lessor.duoc_tao}</th>
            <th scope="col"></th>
            <th scope="col">Status</th>
            <th scope="col">{trans.lessor.hanh_dong}</th>
          </tr>
        </thead>
        {/* End thead */}

        <tbody>
          {data?.items &&
            data.items?.map((item) => (
              <tr key={item?.id} className="title" scope="row">
                <td>{item.name}</td>
                <td className="dn-lg"></td>
                <td className="dn-lg"></td>
                <td>{new Date(item?.createdAt).toLocaleDateString()}</td>
                <td></td>
                <td className={getStatusColor(item?.adminStatus)}>{item?.adminStatus}</td>
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
                        <FormView id={item?.id} getNewData={getData} />
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
                        <FormEdit id={item?.id} getNewData={getData}/>
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

export default HousesData;
