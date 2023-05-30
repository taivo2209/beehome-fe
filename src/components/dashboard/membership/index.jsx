import useTrans from '../../../pages/hooks/useTran';
import Header from '../../common/header/dashboard/Header';
import SidebarMenu from '../../common/header/dashboard/SidebarMenu';
import MobileMenu from '../../common/header/MobileMenu';
import Pricing from './Pricing';

const Index = () => {
  const trans = useTrans();
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}
              </div>
              {/* End .row */}
              <section className="our-service pb30">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                      <div className="main-title text-center">
                        <h2>{trans.lessor.membership.chon_goi_thich_hop}</h2>
                        <p>{trans.lessor.membership.cung_cap}</p>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="row">
                    <Pricing />
                  </div>
                  {/* End .row */}
                </div>
              </section>

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
    </>
  );
};

export default Index;
