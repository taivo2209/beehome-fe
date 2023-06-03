import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import ManageReport from "../../components/admin/manage-report"

const index = () => {
    return (
      <>
        <Seo pageTitle="Reports List" />
        <ManageReport />
      </>
    );
  };
  
  export default dynamic(() => Promise.resolve(index), { ssr: false });
  