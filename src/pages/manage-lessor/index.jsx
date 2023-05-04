import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import ManageLessor from "../../components/admin/manage-lessor"

const index = () => {
    return (
      <>
        <Seo pageTitle="My Attributes" />
        <ManageLessor />
      </>
    );
  };
  
  export default dynamic(() => Promise.resolve(index), { ssr: false });
  