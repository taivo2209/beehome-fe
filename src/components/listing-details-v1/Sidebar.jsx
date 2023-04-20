import ContactWithAgent from '../common/agent-view/ContactWithAgent';
import Categorie from '../common/listing/Categorie';
import ListingCreator from '../common/listing/ListingCreator';
import FeaturedListings from '../common/listing/FeaturedListings';
import FeatureProperties from '../common/listing/FeatureProperties';
import { useEffect, useState } from 'react';
import DetailBoardingHouse from '../common/agent-view/detailBoardingHouse';
const Sidebar = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <div className="sl_creator">
            <h4 className="mb25">Listed By</h4>
            <ListingCreator />
          </div>
          {/* End .sl_creator */}
          {/* <ContactWithAgent /> */}
          <div className="search_option_button">
            <button
              type="submit"
              className="btn btn-block btn-thm w-100"
              onClick={toggle}
            >
              Xem phòng trống
            </button>
          </div>
          <DetailBoardingHouse isOpen={modal} toggle={toggle} />
        </div>
      </div>
      {/* End .sidebar_listing_list */}

      <div className="terms_condition_widget">
        <h4 className="title">Featured Properties</h4>
        <div className="sidebar_feature_property_slider">
          <FeatureProperties />
        </div>
      </div>
      {/* End .Featured Properties */}

      <div className="terms_condition_widget">
        <h4 className="title">Categories Property</h4>
        <div className="widget_list">
          <ul className="list_details">
            <Categorie />
          </ul>
        </div>
      </div>
      {/* End .Categories Property */}

      <div className="sidebar_feature_listing">
        <h4 className="title">Recently Viewed</h4>
        <FeaturedListings />
      </div>
      {/* End .Recently Viewed */}
    </>
  );
};

export default Sidebar;
