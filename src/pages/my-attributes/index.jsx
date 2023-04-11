import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyAttributes from "../../components/dashboard/my-attributes"

const index = () => {
    return (
      <>
        <Seo pageTitle="My Attributes" />
        <MyAttributes />
      </>
    );
  };
  
  export default dynamic(() => Promise.resolve(index), { ssr: false });
  