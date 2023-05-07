import Categorie from './Categorie';
import FeaturedListings from './FeaturedListings';
import FeatureProperties from './FeatureProperties';
import FilteringItem from './FilteringItem';

const SidebarListing = () => {
  return (
    <div className="sidebar_listing_grid1">
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <FilteringItem />
        </div>
      </div>
      {/* End .sidebar_listing_list */}

      {/* End .Featured Properties */}

      {/* End .Categories Property */}

      <div className="sidebar_feature_listing">
        <h4 className="title">Recently Viewed</h4>
        <FeaturedListings />
      </div>
      {/* End .Recently Viewed */}
    </div>
  );
};

export default SidebarListing;
