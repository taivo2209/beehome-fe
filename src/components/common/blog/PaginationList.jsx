import { Pagination } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataPaging } from '../../../features/dataSearch/dataSearchSlice';
const PaginationList = ({ setComment }) => {
  const { data } = useSelector((state) => state.dataSearch);
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    const itemsPerPage = 10;
    const startIndex = (value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    dispatch(setDataPaging(data?.slice(startIndex, endIndex)));
    // setComment(data?.slice(startIndex, endIndex));
  };
  //   useEffect(() => {
  //     dispatch(setDataPaging(data));
  //   }, []);
  return (
    <>
      <ul className="page_navigation">
        <li className="page-item disabled">
          <Pagination
            count={Math.ceil(data?.length / 10)}
            style={{ color: '#ee7b35' }}
            onChange={handleChange}
          />
        </li>
      </ul>
    </>
  );
};

export default PaginationList;
