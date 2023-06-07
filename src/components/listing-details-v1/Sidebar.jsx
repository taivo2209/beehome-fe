import ListingCreator from '../common/listing/ListingCreator';
import FeaturedListings from '../common/listing/FeaturedListings';
import { useEffect, useState } from 'react';
import DetailBoardingHouse from '../common/agent-view/detailBoardingHouse';
import useTrans from '../../pages/hooks/useTran';
import Link from 'next/link';
import ReportBox from '../blog-details/ReportBox';
import { useRouter } from 'next/router';
const Sidebar = ({
  floor,
  data,
  customer,
  posterId,
  poster,
  accessToken,
  boardingHouseId,
}) => {
  const [modal, setModal] = useState(false);
  const trans = useTrans();
  const toggle = () => {
    setModal(!modal);
  };
  const router = useRouter();
  // console.log('====', customer);
  return (
    <>
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <div className="sl_creator">
            <h4 className="mb25">{trans.detail.chu_nha}</h4>
            <ListingCreator data={poster} />
          </div>
          {/* End .sl_creator */}
          {/* <ContactWithAgent /> */}
          <div className="search_option_button">
            <button
              type="submit"
              className="btn btn-block btn-thm w-100"
              onClick={toggle}
            >
              {trans.detail.xem_phong}
            </button>
          </div>
          <DetailBoardingHouse
            floor={floor}
            isOpen={modal}
            toggle={toggle}
            data={data}
            customer={customer}
            posterId={posterId}
          />
        </div>
      </div>

      <div className="sidebar_feature_listing">
        <h4 className="title"></h4>
        <FeaturedListings />
      </div>
      {/* End .Recently Viewed */}
      {customer != null ? (
        <ReportBox
          accessToken={accessToken}
          boardingHouseId={boardingHouseId}
        />
      ) : (
        <button
          type="submit"
          className="btn btn-thm col-lg-8 offset-lg-3"
          onClick={() => {
            router.push('/login');
          }}
        >
          {/* <Link href="/login"> */}
          <span>{trans.detail.dang_nhap_bc}</span>
          {/* </Link> */}
        </button>
      )}
    </>
  );
};

export default Sidebar;
