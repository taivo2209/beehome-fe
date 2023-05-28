import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import ManageIncome from "../../components/admin/manage-income"

const index = () => {
    return (
      <>
        <Seo pageTitle="Manage Income" />
        <ManageIncome />
      </>
    );
  };
  
  export default dynamic(() => Promise.resolve(index), { ssr: false });
  