import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import CustomerProfile from "../../components/customer-profile";

const index = () => {
  return (
    <>
      <Seo pageTitle="Profile" />
      <CustomerProfile />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
