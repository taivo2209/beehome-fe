import featureProContent from '../../../data/properties';
import Slider from 'react-slick';

const FeatureRooms = ({ openFormToMeet }) => {
  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
  };

  return (
    <>
      <Slider {...settings} arrows={false}>
        {featureProContent.slice(0, 5).map((item) => (
          <div className="item" key={item.id}>
            <div className="feat_property home7">
              <div className="thumb">
                <img
                  className="img-whp"
                  src={item.img}
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
          Đặt lịch hẹn
        </button>
      </div>
    </>
  );
};

export default FeatureRooms;