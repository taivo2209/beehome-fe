import Link from 'next/link';
import useTrans from '../../../pages/hooks/useTran';
import { Tooltip } from '@mui/material';

const FeaturedListings = ({ data }) => {
  const getViewedItems = () => {
    const viewedItems = JSON.parse(localStorage.getItem('viewedItems')) || [];
    return viewedItems;
  };
  const viewedItems = getViewedItems();
  const trans = useTrans();
  return (
    <>
      {viewedItems.slice(0, 3).map((item) => (
        <div className="media d-flex" key={item[0]?.id}>
          <Link href={`/house-details/${item[0]?.id}`}>
            <img
              className="align-self-start me-3"
              src={item[0]?.img}
              alt="featured listing image"
            />
          </Link>

          <div className="media-body">
            <h5 className="mt-0 post_title">
              <Link href={`/listing-details-v1/${item[0]?.id}`}>
                <Tooltip title={item[0]?.title} placement="bottom">
                  <div> {item[0]?.title}</div>
                </Tooltip>
              </Link>
            </h5>
            <Link href={`/listing-details-v1/${item[0]?.id}`}>
              {trans.from}{' '}
              {item[0]?.price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              <small>{trans.detail.gia_thang}</small>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
