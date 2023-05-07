import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyBookings from "../../components/dashboard/my-bookings"

const index = () => {
    return (
      <>
        <Seo pageTitle="My Bookings" />
        <MyBookings />
      </>
    );
  };
  
  export default dynamic(() => Promise.resolve(index), { ssr: false });
  