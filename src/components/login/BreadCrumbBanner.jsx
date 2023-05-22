import useTrans from "../../pages/hooks/useTran";
import BreadCrumb from "../common/BreadCrumb";

const BreadCrumbBanner = () => {
  const trans = useTrans();
  return (
    <section className="inner_page_breadcrumb">
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="breadcrumb_content">
              <BreadCrumb title={trans.login.dang_nhap} />
              <h4 className="breadcrumb_title">{trans.login.dang_nhap}</h4>
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbBanner;
