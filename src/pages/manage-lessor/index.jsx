import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import ManageLessor from "../../components/admin/manage-lessor"

const index = () => {
    return (
      <>
        <Seo pageTitle="Lessors List" />
        <ManageLessor />
      </>
    );
  };
  
  export default dynamic(() => Promise.resolve(index), { ssr: false });
  