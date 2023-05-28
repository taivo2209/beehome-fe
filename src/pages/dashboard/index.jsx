import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import DashBoard from "../../components/admin/dashboard"

const index = () => {
    return (
      <>
        <Seo pageTitle="Lessors List" />
        <DashBoard />
      </>
    );
  };
  
  export default dynamic(() => Promise.resolve(index), { ssr: false });
  