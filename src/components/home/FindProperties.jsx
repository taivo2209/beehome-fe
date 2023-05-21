import Link from 'next/link';
import findProperties from '../../data/findProperties';
import { ImageList, ImageListItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}
const FindProperties = () => {
  return (
    <>
      <ImageList variant="quilted" cols={4}>
        {findProperties.slice(0, 4).map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
          >
            <div className="properti_city d-block">
              <div
                className="thumb"
                style={{
                  'object-fit': 'cover',
                  width: '100%',
                  height: '100%',
                  display: 'block',
                }}
              >
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
