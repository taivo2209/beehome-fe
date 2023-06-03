import CallToAction from '../common/CallToAction';
import CopyrightFooter from '../common/footer/CopyrightFooter';
import Footer from '../common/footer/Footer';
import MobileMenu from '../common/header/MobileMenu';
import FeaturedProperties from './FeaturedProperties';
import Header from './Header';
import Hero from './Hero';
import RecentlyFeaturedProperties from './RecentlyFeaturedProperties';
import FindProperties from './FindProperties';
import FeaturedAvgStarProperties from './FeaturedAvgStarProperties';
import useTrans from '../../pages/hooks/useTran';
import FeaturedPropertiesHome3 from './FeaturedPropertiesHome3';

const Index = () => {
  const trans = useTrans();
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Home Design --> */}
      <Hero />

      <section
        id="feature-property"
        className="feature-property mt80 pb50 bgc-f7"
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="main-title text-center mb40 ">
              <h2>{trans.home.xu_huong}</h2>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="feature_property_home3_slider gutter-x15">
              <FeaturedPropertiesHome3 />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Property Cities --> */}
      <section id="property-city" className="property-cityy pb30">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                {/* <h2>{trans.home.dia_diem_noi_bat}</h2> */}
              </div>
            </div>
          </div>
          <div className="row">
            <FindProperties />
          </div>
        </div>
      </section>

      {/* <!-- Feature Properties --> */}
      <section id="feature-property" className="feature-property bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb40">
                <h2>{trans.home.duoc_danh_gia_cao} </h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="feature_property_slider gutter-x15">
                <FeaturedAvgStarProperties />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Feature Properties --> */}

      {/* <!-- Feature Properties --> */}
      <section id="feature-property" className="property-city pb30">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb40">
                <h2>{trans.home.da_xem_gan_day}</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="feature_property_slider gutter-x15">
                <RecentlyFeaturedProperties />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Feature Properties --> */}
      {/* <section id="feature-property" className="feature-property bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb40">
                <h2>Ưu đãi</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="feature_property_slider gutter-x15">
                <FeaturedProperties />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <!-- Start Call to Action --> */}
      <section className="start-partners bgc-thm pt50 pb50">
        <div className="container">
          <CallToAction />
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default Index;
