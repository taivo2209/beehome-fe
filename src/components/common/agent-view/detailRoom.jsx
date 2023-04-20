import PropertyAttribute from '../listing-details/PropertyAttributeRoom';
import PropertyItem from '../listing-details/PropertyItem';
import FeatureRooms from '../listing/FeatureRooms';

const DetailRoom = ({ openFormToMeet }) => {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div
        className="listing_single_description"
        style={{
          width: '70%',
          overflow: 'auto',
          height: '60vh',
        }}
      >
        <div className="lsd_list">
          <PropertyItem />
        </div>
        {/* End .lsd_list */}
        <h4 className="mb30">Description</h4>
        <div className="application_statics mt30">
          <div className="row">
            <PropertyAttribute />
          </div>
        </div>
      </div>

      <div
        className="terms_condition_widget"
        style={{
          width: '30%',
          overflow: 'auto',
          height: '60vh',
        }}
      >
        <h4 className="title">Featured Properties</h4>
        <div className="sidebar_feature_property_slider">
          <FeatureRooms openFormToMeet={openFormToMeet} />
        </div>
      </div>
    </div>
  );
};

export default DetailRoom;
