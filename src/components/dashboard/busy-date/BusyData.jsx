import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormAdd from './FormAdd';
import Swal from 'sweetalert2';
import Pagination from '../../common/Pagination';
import useTrans from '../../../pages/hooks/useTran';

const BusyData = () => {
  const trans = useTrans();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/lessor/book-disable?page=${currentPage}&limit=5`,
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

  const handleDelete = async (busyId) => {
    try {
      const result = await Swal.fire({
        title: `${trans.lessor.xac_nhan_xoa}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: `${trans.lessor.xoa}`,
        cancelButtonText: `${trans.huy_bo}`,
      });
      if (result.isConfirmed) {
        const res = await axios.delete(
          `http://localhost:5000/lessor/book-disable/${busyId}`,
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
          title: `${trans.lessor.xoa_thanh_cong}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
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
            <th scope="col">{trans.lessor.busy.ngay_nghi}</th>
            <th className="dn-lg" scope="col"></th>
            <th className="dn-lg" scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col">{trans.lessor.duoc_tao}</th>
            <th scope="col">{trans.lessor.duoc_tao}</th>
          </tr>
        </thead>
        {/* End thead */}

        <tbody>
          {data?.items &&
            data?.items?.map((item) => (
              <tr key={item.id} className="title" scope="row">
                <td>{new Date(item.dateDisable).toLocaleDateString()}</td>
                <td className="dn-lg"></td>
                <td className="dn-lg"></td>
                <td></td>
                <td></td>
                <td className="para">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <ul className="view_edit_delete_list mb0">
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

export default BusyData;
