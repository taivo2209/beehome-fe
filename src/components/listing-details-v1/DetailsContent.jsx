import Link from 'next/link';
import { useEffect, useState } from 'react';
import Comments from '../blog-details/Comments';
import Ratings from '../blog-details/Ratings';
import ReviewBox from '../blog-details/ReviewBox';
import Paginations from '../common/blog/Pagination';
import PropertyDescriptions from '../common/listing-details/PropertyDescriptions';
import PropertyDetails from '../common/listing-details/PropertyDetails';
import PropertyFeatures from '../common/listing-details/PropertyFeatures';
import PropertyLocation from '../common/listing-details/PropertyLocation';
import PropertyRenDeposits from '../common/listing-details/PropertyRensDeposits';
import PropertyRule from '../common/listing-details/PropertyRule';
import { useSelector } from 'react-redux';
import axios from 'axios';

const DetailsContent = ({
  dataDetail,
  boardingHouseId,
  setCustomer,
  customer,
}) => {
  const [comments, setComment] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const checkLogin = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/customer/auth/current`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setCustomer(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/customer/comment/${boardingHouseId}`,
      );

      setCommentsData(res.data?.commentToBoardingHouses);
      setComment(res.data?.commentToBoardingHouses.slice(0, 4));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, [boardingHouseId]);
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      <div className="listing_single_description">
        {/* End .listing_single_description */}
        <h4 className="mb30">Description</h4>
        <PropertyDescriptions description={dataDetail?.description} />
      </div>
      {/* End .listing_single_description */}

      <div className="additional_details">
        <div className="row">
          <div className="col-lg-12">
            {/* Fee */}
            <h4 className="mb15">Property Details</h4>
          </div>
          <PropertyDetails dataDetail={dataDetail} />
        </div>
      </div>

      <div className="application_statics mt30">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="mb10">Features</h4>
          </div>
          {/* End .col */}

          <PropertyFeatures attributes={dataDetail?.attributes} />
        </div>
      </div>

      <div className="listing_single_description">
        {/* End .listing_single_description */}
        <h4 className="mb30">Rule</h4>
        <PropertyRule rule={dataDetail?.rule} />
      </div>

      <div className="listing_single_description">
        {/* End .listing_single_description */}
        <h4 className="mb30">RenDeposits</h4>
        <PropertyRenDeposits renDeposits={dataDetail?.rentDeposit} />
      </div>

      {/* End .feature_area */}

      <div className="application_statics mt30">
        <h4 className="mb30">
          Location{' '}
          <small className="float-end">
            1421 San Pedro St, Los Angeles, CA 90015
          </small>
        </h4>
        <div className="property_video p0">
          <PropertyLocation />
        </div>
      </div>
      {/* End .location_area */}

      {/* COMMENT */}

      <div className="product_single_content">
        <div className="mbp_pagination_comments mt30">
          <div className="total_review">
            <h4>896 Reviews</h4>
            <ul className="review_star_list mb0 pl10">
              <Ratings />
            </ul>
            <a className="tr_outoff pl10" href="#">
              ( 4.5 out of 5 )
            </a>
            <a className="write_review float-end fn-xsd" href="#">
              Write a Review
            </a>
          </div>
          {/* End .total_review */}
          <div className="col-md-12 col-lg-8">
            <Comments comments={comments} />
          </div>
          <div className="row">
            <div className="col-lg-12 mt20">
              <div className="mbp_pagination">
                <Paginations setComment={setComment} data={commentsData} />
              </div>
            </div>
          </div>
          <div className="custom_hr"></div>

          <div className="mbp_comment_form style2">
            <h4>Write a Review</h4>
            <ul className="review_star">
              <li className="list-inline-item">
                <span className="sspd_review">
                  <ul>
                    <Ratings />
                  </ul>
                </span>
              </li>
            </ul>
            {customer != null ? (
              <ReviewBox
                accessToken={accessToken}
                boardingHouseId={boardingHouseId}
                getData={getData}
              />
            ) : (
              <button
                type="submit"
                className="btn btn-thm col-lg-6 offset-lg-3"
              >
                <Link href="/login">
                  <span> Login for Review</span>
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>
      {/* End review and comment area area */}
    </>
  );
};

export default DetailsContent;
