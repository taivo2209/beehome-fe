import { useSelector } from 'react-redux';
import useTrans from '../../../pages/hooks/useTran';
import PropertyAttribute from '../listing-details/PropertyAttributeRoom';
import PropertyItem from '../listing-details/PropertyItem';
import FeatureRooms from '../listing/FeatureRooms';

const DetailRoom = ({ openFormToMeet, dataRoom, floor }) => {
  const { typeData } = useSelector((state) => state.langType);
  const locale = typeData;
  const transs = locale === 'vi' ? 'VN' : 'EN';
  const trans = useTrans();
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
          <PropertyItem dataRoom={dataRoom} />
        </div>
        {/* End .lsd_list */}
        <h4 className="mb30">{trans.lessor.rooms.tien_ich}</h4>
        <div className="application_statics mt30">
          <div className="row">
            <PropertyAttribute
              attributes={floor?.queryBuilder
                .filter((item) => item.lang === transs)
                .map((item) => item.name)}
            />
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
        <h4 className="title">{trans.lessor.rooms.anh}</h4>
        <div className="sidebar_feature_property_slider">
          <FeatureRooms openFormToMeet={openFormToMeet} dataRoom={dataRoom} />
        </div>
      </div>
    </div>
  );
};

export default DetailRoom;
