import useTrans from '../../../pages/hooks/useTran';
import CopyrightFooter from '../../common/footer/CopyrightFooter';
import Footer from '../../common/footer/Footer';
import Header from '../../common/header/DefaultHeader';
import MobileMenu from '../../common/header/MobileMenu';
import CustomerProfile from './CustomerProfile';

const Index = () => {
  const trans = useTrans();
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">{trans.header.thong_tin}</h2>
                    <p>We are glad to see you again!</p>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-10">
                  <div className="my_dashboard_review">
                    <div className="row">
                      <div className="col-xl-2">
                        <h4>{trans.cus_profile.thong_tin}</h4>
                      </div>
                      <div className="col-xl-10">
                        <CustomerProfile />
                      </div>
                    </div>
                  </div>
                  {/* End prifle info wrapper end */}

                  {/* <div className="my_dashboard_review mt30">
                      <div className="row">
                        <div className="col-xl-2">
                          <h4>Social Media</h4>
                        </div>
                        <div className="col-xl-10">
                          <SocialMedia />
                        </div>
                      </div>
                    </div> */}
                  {/* End .SocialMedia */}

                  {/* <div className="my_dashboard_review mt30">
                      <div className="row">
                        <div className="col-xl-2">
                          <h4>Change password</h4>
                        </div>
                        <div className="col-xl-10">
                          <ChangePassword />
                        </div>
                      </div>
                    </div> */}
                </div>
              </div>
              {/* End .row */}

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>© 2023 BeeHome. Made with love.</p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
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
