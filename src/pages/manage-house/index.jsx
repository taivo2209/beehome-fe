import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import ManageHouse from "../../components/admin/manage-house"

const index = () => {
    return (
      <>
        <Seo pageTitle="House Manage" />
        <ManageHouse />
      </>
    );
  };
  
  export default dynamic(() => Promise.resolve(index), { ssr: false });
  