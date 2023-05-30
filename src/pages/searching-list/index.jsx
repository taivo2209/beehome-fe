import dynamic from 'next/dynamic';
import Seo from '../../components/common/seo';
import GridV1 from '../../components/listing-grid';

const index = () => {
  return (
    <>
      <Seo pageTitle="Searching Listing" />
      <GridV1 />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
