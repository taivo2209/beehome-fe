import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import ForgotPassword from "../../components/customer/forgot-password";

const index = () => {
  return (
    <>
      <Seo pageTitle="Update Password" />
      <ForgotPassword />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
