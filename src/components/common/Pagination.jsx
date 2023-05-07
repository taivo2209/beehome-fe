import _ from 'lodash';
const Pagination = ({ pageSize, currentPage, onPageChange }) => {
  const pageCount = pageSize;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav>
      <ul className="page_navigation">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item'}
          >
            <a
              style={{ cursor: 'pointer' }}
              onClick={() => onPageChange(page)}
              className="page-link"
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
