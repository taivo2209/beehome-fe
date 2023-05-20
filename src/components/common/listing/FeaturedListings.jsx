import Link from 'next/link';
import featureContent from '../../../data/properties';

const FeaturedListings = ({ data }) => {
  const getViewedItems = () => {
    const viewedItems = JSON.parse(localStorage.getItem('viewedItems')) || [];
    return viewedItems;
  };
  const viewedItems = getViewedItems();
  // console.log(viewedItems);
  return (
    <>
      {viewedItems.slice(0, 3).map((item) => (
        <div className="media d-flex" key={item[0]?.id}>
          <Link href={`/listing-details-v1/${item[0]?.id}`}>
            <img
              className="align-self-start me-3"
              src={item[0]?.img}
              alt="featured listing image"
            />
          </Link>

          <div className="media-body">
            <h5 className="mt-0 post_title">
              <Link href={`/listing-details-v1/${item[0]?.id}`}>
                {item[0]?.title}
              </Link>
            </h5>
            <Link href={`/listing-details-v1/${item[0]?.id}`}>
              from {item[0]?.price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              <small>đ/mo</small>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
