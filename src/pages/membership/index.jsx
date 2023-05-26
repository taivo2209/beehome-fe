import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyMembership from "../../components/dashboard/membership"

const index = () => {
    return (
      <>
        <Seo pageTitle="My Attributes" />
        <MyMembership />
      </>
    );
  };
  
  export default dynamic(() => Promise.resolve(index), { ssr: false });
  