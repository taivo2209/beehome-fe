import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyHouses from "../../components/dashboard/my-houses"

const index = () => {
    return (
      <>
        <Seo pageTitle="My Houses" />
        <MyHouses />
      </>
    );
  };
  
  export default dynamic(() => Promise.resolve(index), { ssr: false });
  