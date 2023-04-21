import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import EditListing from "../../components/dashboard/my-houses/edit-listing";

const index = () => {
  return (
    <>
      <Seo pageTitle="Edit Listing" />
      <EditListing />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
