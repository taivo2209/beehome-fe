import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import UpdatePassword from "../../components/customer/change-password";

const index = () => {
  return (
    <>
      <Seo pageTitle="Update Password" />
      <UpdatePassword />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
