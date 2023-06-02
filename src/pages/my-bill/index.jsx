import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyBills from "../../components/dashboard/my-bill"

const index = () => {
    return (
      <>
        <Seo pageTitle="Bills" />
        <MyBills />
      </>
    );
  };
  
  export default dynamic(() => Promise.resolve(index), { ssr: false });
  