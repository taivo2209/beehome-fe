import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import ManageCustomer from "../../components/admin/manage-customer"

const index = () => {
    return (
      <>
        <Seo pageTitle="Customer List" />
        <ManageCustomer />
      </>
    );
  };
  
  export default dynamic(() => Promise.resolve(index), { ssr: false });
  