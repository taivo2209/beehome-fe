import Link from "next/link";
import useTrans from "../../pages/hooks/useTran";

const CallToAction = () => {
  const trans = useTrans();
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="start_partner tac-smd">
          <h2>{trans.home.thanh_vien}</h2>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4">
        <div className="parner_reg_btn text-right tac-smd">
          <Link href="/register" className="btn btn-thm2">
            {trans.home.dang_ky}
          </Link>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default CallToAction;
