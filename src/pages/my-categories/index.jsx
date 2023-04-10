import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyCategories from "../../components/dashboard/my-categories"

const index = () => {
    return (
      <>
        <Seo pageTitle="My Categories" />
        <MyCategories />
      </>
    );
  };
  
  export default dynamic(() => Promise.resolve(index), { ssr: false });
  