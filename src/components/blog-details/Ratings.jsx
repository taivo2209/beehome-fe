const Ratings = ({ star }) => {
  const fullStars = Math.floor(star); // Số sao đầy
  const halfStars = Math.ceil(star - fullStars); // Số sao nửa
  const emptyStars = 5 - fullStars - halfStars; // Số sao rỗng

  // Tạo danh sách các sao dựa trên số lượng sao tương ứng
  const fullStarsList = Array.from({ length: fullStars }, (_, i) => (
    <li className="list-inline-item" key={i}>
      <a href="#">
        <i className="fa fa-star"></i>
      </a>
    </li>
  ));
  const halfStarsList = Array.from({ length: halfStars }, (_, i) => (
    <li className="list-inline-item" key={i}>
      <a href="#">
        <i className="fa fa-star-half-o"></i>
      </a>
    </li>
  ));
  const emptyStarsList = Array.from({ length: emptyStars }, (_, i) => (
    <li className="list-inline-item" key={i}>
      <a href="#">
        <i className="fa fa-star-o"></i>
      </a>
    </li>
  ));
  return (
    <>
      {fullStarsList}
      {halfStarsList}
      {emptyStarsList}
    </>
  );
};

export default Ratings;
