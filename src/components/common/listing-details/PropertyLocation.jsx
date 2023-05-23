import GoogleMapReact from 'google-map-react';
import { HiLocationMarker } from 'react-icons/hi';

const AnyReactComponent = ({ icon }) => <div>{icon}</div>;

const PropertyLocation = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  // console.log(coords);
  return (
    <>
      <div className="thumb">
        <div className="h400" id="map-canvas">
          {/* <GoogleMapReact
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
          </GoogleMapReact> */}
          <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </div>
    </>
  );
};

export default PropertyLocation;
