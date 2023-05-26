import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import SignUpCustomer from "../components/customer/register";

const index = () => {
  return (
    <>
      <Seo pageTitle="SignUp" />
      <SignUpCustomer />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
