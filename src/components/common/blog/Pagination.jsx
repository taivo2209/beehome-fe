import { Pagination } from '@mui/material';
import React, { useEffect } from 'react';
const Paginations = ({ setComment, data }) => {
  const handleChange = (event, value) => {
    const itemsPerPage = 4;
    const startIndex = (value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setComment(data?.slice(startIndex, endIndex));
  };

  return (
    <>
      <ul className="page_navigation">
        <li className="page-item disabled">
          <Pagination
            count={Math.ceil(data?.length / 4)}
            style={{ color: '#ee7b35' }}
            onChange={handleChange}
          />
        </li>
      </ul>
    </>
  );
};

export default Paginations;
