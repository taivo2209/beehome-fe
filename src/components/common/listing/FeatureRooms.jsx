import Slider from 'react-slick';
import useTrans from '../../../pages/hooks/useTran';

const FeatureRooms = ({ openFormToMeet, dataRoom }) => {
  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
  };
  const trans = useTrans();

  return (
    <>
      <Slider {...settings} arrows={false}>
        {dataRoom.roomImages.slice(0, 5).map((item) => (
          <div className="item" key={item.id}>
            <div className="feat_property home7">
              <div className="thumb">
                <img
                  className="img-whp"
                  src={item.localFile.path}
                  alt="properties identity"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <div className="search_option_button">
        <button
          type="submit"
          className="btn btn-block btn-thm w-100"
          onClick={openFormToMeet}
        >
          {trans.booking.dat_lich}
        </button>
      </div>
    </>
  );
};

export default FeatureRooms;
