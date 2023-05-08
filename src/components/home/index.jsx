import CallToAction from '../common/CallToAction';
import CopyrightFooter from '../common/footer/CopyrightFooter';
import Footer from '../common/footer/Footer';
import MobileMenu from '../common/header/MobileMenu';
import Partners from '../common/Partners';
import FeaturedProperties from './FeaturedProperties';
import Header from './Header';
import Hero from './Hero';
import WhyChoose from '../common/WhyChoose';
import PopupSignInUp from '../common/PopupSignInUp';
import RecentlyFeaturedProperties from './RecentlyFeaturedProperties';
import FindProperties from './FindProperties';
// import FindProperties from '../../data/findProperties';

const Index = () => {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Home Design --> */}
      <Hero />

      {/* <!-- Feature Properties --> */}
      <section id="feature-property" className="feature-property bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb40">
                <h2>Xu hướng </h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="feature_property_slider gutter-x15">
                <FeaturedProperties />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Feature Properties --> */}
      <section id="feature-property" className="property-city pb30">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb40">
                <h2>Trọ đã xem</h2>
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
      <section id="feature-property" className="feature-property bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb40">
                <h2>Ưu đãi</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="feature_property_slider gutter-x15">
                {/* <FeaturedProperties /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Property Cities --> */}
      <section id="property-city" className="property-city pb30">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Địa điểm nổi bật</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <FindProperties />
          </div>
        </div>
      </section>

      {/* <!-- Why Chose Us --> */}
      {/* <section id="why-chose" className="whychose_us bgc-f7 pb30">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Why Choose Us</h2>
                <p>We provide full service at every step.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <WhyChoose />
          </div>
        </div>
      </section> */}

      {/* <!-- Our Blog --> */}
      {/* <section className="our-blog bgc-f7 pb30">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Articles & Tips</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <!-- Our Partners --> */}
      <section id="our-partners" className="our-partners">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Our Partners</h2>
                <p>We only work with the best companies around the globe</p>
              </div>
            </div>
          </div>
          <div className="row">
            <Partners />
          </div>
        </div>
      </section>

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
