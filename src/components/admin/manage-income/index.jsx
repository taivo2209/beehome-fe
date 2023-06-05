import Header from '../../common/header/admin/Header';
import SidebarMenu from '../../common/header/admin/SidebarMenu';
import MobileMenu from '../../common/header/MobileMenu';
import StatisticsChart from './StatisticsChart';
import IncomesData from './IncomesData';

const index = () => {
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

                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">Income</h2>
                    <p>We are glad to see you again!</p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              {/* End .row Dashboard top statistics */}

              <div className="row">
                {/* <div className="col-xl-12">
                  <div className="application_statics">
                    <h4 className="mb-4">Income Statistics</h4>
                    <StatisticsChart />
                  </div>
                </div> */}
                {/* End statistics chart */}
                <div className="row mt-4">
                  <div className="col-lg-12">
                    <div className="my_dashboard_review mb40">
                      <div className="col-lg-12">
                        <div className="savesearched_table">
                          <div className="table-responsive mt0">
                            <h4 className="mb-4">Income Table</h4>
                            <IncomesData />
                          </div>
                        </div>
                        {/* End .packages_table */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End .row  */}

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>© 2023 Beehome. Made with love.</p>
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

export default index;
