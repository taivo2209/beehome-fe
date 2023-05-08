const BreadCrumb = ({ title = 'search' }) => {
  return (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="">Home</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Searching-list
        </li>
      </ol>
    </>
  );
};

export default BreadCrumb;
