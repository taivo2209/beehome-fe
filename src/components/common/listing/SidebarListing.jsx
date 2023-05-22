import useTrans from '../../../pages/hooks/useTran';
import FeaturedListings from './FeaturedListings';
import FilteringItem from './FilteringItem';

const SidebarListing = () => {
  const trans = useTrans();
  return (
    <div className="sidebar_listing_grid1">
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <FilteringItem />
        </div>
      </div>
      {/* End .sidebar_listing_list */}

      <div className="sidebar_feature_listing">
        <h4 className="title">{trans.home.da_xem_gan_day}</h4>
        <FeaturedListings />
      </div>
      {/* End .Recently Viewed */}
    </div>
  );
};

export default SidebarListing;
