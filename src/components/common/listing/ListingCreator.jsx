const Creator = ({ data }) => {
  return (
    <div className="media d-flex">
      {/* <img className="me-3" src={data.posterAvatar} alt="lc1.png" /> */}
      <div className="thumb">
        <img
          className="img-whp"
          style={{ height: '40px', width: '40px', paddingRight: '10px' }}
          src={data?.posterAvatar}
          alt="fp1.jpg"
        />
      </div>
      <div className="media-body">
        <h5 className="mt-0 mb0">{data?.posterName}</h5>

        <a className="text-thm" href="#">
          View My Listing
        </a>
      </div>
    </div>
  );
};

export default Creator;
