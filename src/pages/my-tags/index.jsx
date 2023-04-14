import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyTags from "../../components/dashboard/my-tags"

const index = () => {
    return (
      <>
        <Seo pageTitle="My Tags" />
        <MyTags />
      </>
    );
  };
  
  export default dynamic(() => Promise.resolve(index), { ssr: false });
  