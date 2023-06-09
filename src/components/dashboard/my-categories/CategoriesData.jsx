import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormView from './FormView';
import FormEdit from './FormEdit';
import FormAdd from './FormAdd';
import { setCategories } from '../../../features/categories/categoriesSlice';
import Swal from 'sweetalert2';
import Pagination from '../../common/Pagination';

const CategoriesData = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://beehome.herokuapp.com/lessor/category?page=${currentPage}&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setData(res.data);
      dispatch(setCategories(res.data.items));
      // console.log(accessToken);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handlePageChange(currentPage);
    getData();
  }, [currentPage]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (categoryId) => {
    try {
      const res = await axios.delete(
        `https://beehome.herokuapp.com/lessor/category/${categoryId}`,
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

  return (
    <>
      <div className="col-md-4 col-lg-4 col-xl-3 mb20">
        <ul className="sasw_list mb0">
          {/* <button className={`list-inline-item add_listing`} style={{
                      border: 'none', backgroundColor:'#ee7b35', padding:'10px', color:'white', borderRadius:'30px'
                    }}>
                        <span className="flaticon-plus"></span>
                        <span className="dn-lg"> Create Categories</span>
                    </button> */}
          <FormAdd getData={getData} />
        </ul>
      </div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Categories</th>
            {/* <th className="dn-lg" scope="col"></th>
          <th className="dn-lg" scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th> */}
            <th scope="col">Created</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {/* End thead */}

        <tbody>
          {data?.items &&
            data?.items?.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.categoryDetails.map((categoryDetail, i) => (
                    <tr key={i}>
                      <td>{categoryDetail.name}</td>
                      <td className="dn-lg"></td>
                      <td className="dn-lg"></td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))}
                </td>
                <td className="para">
                  {new Date(item.createdAt).toLocaleDateString()}
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
                        <FormView id={item.id} getDataNew={getData} />
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

export default CategoriesData;
