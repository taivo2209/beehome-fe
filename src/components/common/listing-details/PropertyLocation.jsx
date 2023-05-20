import GoogleMapReact from 'google-map-react';
import {HiLocationMarker} from 'react-icons/hi';

const AnyReactComponent = ({ icon }) => <div>{icon}</div>;

const PropertyLocation = ({coords}) => {
  console.log(coords);
  return (
    <>
      <div className="thumb">
        <div className="h400" id="map-canvas">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyB5v4EEj3ZA8qEohuxds5A7IWs3eEaKA3c',
            }}
            defaultCenter={coords}
            defaultZoom={11}
            center={coords}
          >
            <AnyReactComponent
              lat={coords?.lat}
              lng={coords?.lng}
              icon={<HiLocationMarker color="red" size={25}/>}
            />
          </GoogleMapReact>
        </div>
      </div>
    </>
  );
};

export default PropertyLocation;
