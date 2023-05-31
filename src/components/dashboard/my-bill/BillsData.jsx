import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import useTrans from '../../../pages/hooks/useTran';
import Pagination from '../../common/Pagination';

const BillsData = () => {
  const trans = useTrans();
  const [data, setData] = useState();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [currentPage, setCurrentPage] = useState(1);

  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/vn-pay?page=${currentPage}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setData(res.data);
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

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">{trans.lessor.bill.goi_thanh_toan}</th>
            <th className="dn-lg" scope="col">
              {trans.lessor.bill.noi_dung}
            </th>
            <th scope="col">{trans.lessor.bill.ngay}</th>
            <th scope="col">{trans.lessor.bill.phuong_thuc}</th>
            <th scope="col">{trans.lessor.bill.so_tien}</th>
          </tr>
        </thead>
        {/* End thead */}

        <tbody>
          {data?.items &&
            data?.items?.map((item) => (
              <tr key={item?.id} className="title" scope="row">
                <td>{item?.packType}</td>
                <td className="dn-lg">{item?.transactionTitle}</td>
                <td>{new Date(item?.createdAt).toLocaleDateString()}</td>
                <td>{item?.cardType}</td>
                <td>
                  {String(Number(item?.price) / 100).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    '.',
                  )}
                  đ
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

export default BillsData;
