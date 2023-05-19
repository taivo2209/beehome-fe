import Link from 'next/link';
import findProperties from '../../data/findProperties';
import { ImageList, ImageListItem } from '@mui/material';
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const FindProperties = () => {
  // const properties = [];

  // for (let i = 0; i < 4; i += 2) {
  //   let property = findProperties[i];
  //   properties.push(
  //     <div className={`col-lg-4 ${property.column}`} key={property.id}>
  //       <Link href="/listing-grid-v1">
  //         <div className="properti_city d-block">
  //           <div className="thumb">
  //             <img
  //               className="img-fluid w100"
  //               src={property.img}
  //               alt="pc1.jpg"
  //             />
  //           </div>
  //           <div className="overlay">
  //             <div className="details">
  //               <h4>{property.name}</h4>
  //               <p>{property.number} Properties</p>
  //             </div>
  //           </div>
  //         </div>
  //       </Link>
  //       {/* <Link href="/listing-grid-v1">
  //         <div className="properti_city d-block">
  //           <div className="thumb">
  //             <img
  //               className="img-fluid w100"
  //               src={property.img}
  //               alt="pc1.jpg"
  //             />
  //           </div>
  //           <div className="overlay">
  //             <div className="details">
  //               <h4>{property.name}</h4>
  //               <p>{property.number} Properties</p>
  //             </div>
  //           </div>
  //         </div>
  //       </Link> */}
  //     </div>,
  //   );
  //   // property = findProperties[i];
  //   // properties.push(
  //   //   <div className={`col-lg-4 ${property.column}`} key={property.id}>
  //   //     <Link href="/listing-grid-v1">
  //   //       <div className="properti_city d-block">
  //   //         <div className="thumb">
  //   //           <img
  //   //             className="img-fluid w100"
  //   //             src={property.img}
  //   //             alt="pc1.jpg"
  //   //           />
  //   //         </div>
  //   //         <div className="overlay">
  //   //           <div className="details">
  //   //             <h4>{property.name}</h4>
  //   //             <p>{property.number} Properties</p>
  //   //           </div>
  //   //         </div>
  //   //       </div>
  //   //     </Link>
  //   //   </div>,
  //   // );
  // }

  return (
    <>
      <ImageList
        // sx={{ width: 500, height: 450 }}
        variant="quilted"
        cols={4}
        // rowHeight={121}
      >
        {findProperties.slice(0, 4).map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
          >
            {/* <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
              // className='img-fluid w-100'
            /> */}
            <div className="properti_city d-block">
              <div className="thumb">
                <img
                  className="img-fluid w100"
                  {...srcset(item.img, 121, item.rows, item.cols)}
                  loading="lazy"
                  alt={item.title}
                />
              </div>
              <div className="overlay">
                <div className="details">
                  <h4>{item.name}</h4>
                </div>
              </div>
            </div>
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};

export default FindProperties;
