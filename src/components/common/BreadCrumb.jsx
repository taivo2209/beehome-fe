const BreadCrumb = ({ title = 'search' }) => {
  return (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="">BeeHome</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          
        </li>
      </ol>
    </>
  );
};

export default BreadCrumb;
