import GoogleMapReact from 'google-map-react';

const PropertyLocation = () => {
  const defaultProps = {
    center: {
      lat: 10.837704,
      lng: 106.765316,
    },
    zoom: 11,
  };

  return (
    <>
      <div className="thumb">
        <div className="h400" id="map-canvas">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyB5v4EEj3ZA8qEohuxds5A7IWs3eEaKA3c',
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          ></GoogleMapReact>
        </div>
      </div>
      {/* <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB5v4EEj3ZA8qEohuxds5A7IWs3eEaKA3c' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        ></GoogleMapReact>
      </div> */}
    </>
  );
};

export default PropertyLocation;
