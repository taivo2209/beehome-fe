import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyBusyDates from "../../components/dashboard/busy-date"

const index = () => {
    return (
      <>
        <Seo pageTitle="My Busy Dates" />
        <MyBusyDates />
      </>
    );
  };
  
  export default dynamic(() => Promise.resolve(index), { ssr: false });
  