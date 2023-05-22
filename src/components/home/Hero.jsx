import { useDispatch } from 'react-redux';
import GlobalFilter from '../common/GlobalFilter';
import LookingItem from './LookingItem';
import { resetData } from '../../features/searching/searchingSlice';
import useTrans from '../../pages/hooks/useTran';

const Hero = () => {
  const dispatch = useDispatch();
  const trans = useTrans();
  dispatch(resetData());
  return (
    <section className="home-one home5-overlay home5_bgi5 parallax">
      <div className="container">
        <div className="row posr">
          <div className="col-lg-7">
            <div className="home_content home5">
              <div className="home-text home5">
                <h2 className="fz55">{trans.home.banner}</h2>
                {/* <p className="discounts_para fz18 color-white">
                  From as low as $10 per day with limited time offer discounts.
                </p> */}
                <h4>{trans.home.banner_}</h4>
                <ul className="mb0">
                  <LookingItem />
                </ul>
              </div>
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-5">
            <div className="home_content home5 style2">
              <GlobalFilter className=" home5_advanced_search_form d-block " />
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
      {/* End .container */}

      <div className="mouse_scroll">
        <a href="#property-city">
          <div className="icon">
            <h4>Scroll Down</h4>
            <p>to discover more</p>
          </div>
          <div className="thumb">
            <img src="assets/images/resource/mouse.png" alt="mouse.png" />
          </div>
        </a>
      </div>
    </section>
    // <div></div>
  );
};

export default Hero;
