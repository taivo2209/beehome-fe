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
// import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import axios from 'axios';
import useTrans from '../../pages/hooks/useTran';
import PropertyVideo from '../common/listing-details/PropertyVideo';
import { useRouter } from 'next/router';

const DetailsContent = ({ dataDetail, boardingHouseId, customer, floor }) => {
  const router = useRouter();
  const { typeData } = useSelector((state) => state.langType);
  const locale = typeData;
  const transs = locale === 'vi' ? 'VN' : 'EN';
  const trans = useTrans();
  const [comments, setComment] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [coords, setCoords] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);
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

  const sum = comments.reduce(
    (total, current) => total + current?.comment?.star,
    0,
  );

  return (
    <>
      <div className="shop_single_tab_content style2 mb30">
        <PropertyVideo
          //  thumbnail={pic}
          videoUrl={dataDetail?.videoUrl}
        />
      </div>
      <div className="listing_single_description">
        {/* End .listing_single_description */}
        <h4 className="mb30">{trans.detail.mo_ta}</h4>
        <PropertyDescriptions
          description={
            floor?.boardingHouse?.boardingHouseDescriptions?.filter(
              (item) => item.lang === transs,
            )[0].content
          }
        />
      </div>
      {/* End .listing_single_description */}

      <div className="additional_details mt30">
        <div className="row">
          <div className="col-lg-12">
            {/* Fee */}
            <h4 className="mb15">{trans.detail.chi_phi}</h4>
          </div>
          <PropertyDetails dataDetail={dataDetail} />
        </div>
      </div>

      <div className="additional_details mt30">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="mb10">{trans.detail.tien_ich}</h4>
          </div>
          {/* End .col */}

          <PropertyFeatures
            attributes={floor?.queryBuilder
              .filter((item) => item.lang === transs)
              .map((item) => item.name)}
          />
        </div>
      </div>

      <div className="additional_details mt30">
        {/* End .listing_single_description */}
        <h4 className="mb30">{trans.detail.quy_dinh}</h4>
        <PropertyRule
          rule={
            floor?.boardingHouse?.boardingHouseRules?.filter(
              (item) => item.lang === transs,
            )[0].content
          }
        />
      </div>

      <div className="additional_details mt30">
        {/* End .listing_single_description */}
        <h4 className="mb30">{trans.detail.tien_coc}</h4>
        <PropertyRenDeposits
          renDeposits={
            floor?.boardingHouse?.boardingHouseRentDeposits?.filter(
              (item) => item.lang === transs,
            )[0].content
          }
        />
      </div>

      {/* End .feature_area */}

      {dataDetail && (
        <div className="application_statics mt30">
          <h4 className="mb30">
            {trans.detail.vi_tri}{' '}
            <small className="float-end">{dataDetail?.location}</small>
          </h4>
          <div className="property_video p0">
            <PropertyLocation />
          </div>
        </div>
      )}
      {/* End .location_area */}

      {/* COMMENT */}

      <div className="product_single_content">
        <div className="mbp_pagination_comments mt30">
          <div className="total_review">
            <h4>
              {comments.length} {trans.detail.danh_gia.viet_danh_gia}
            </h4>
            <ul className="review_star_list mb0 pl10">
              <Ratings />
            </ul>
            <a className="tr_outoff pl10" href="#">
              {/* ( {sum ? sum : '0' / comments.length} {trans.detail.danh_gia.tren}{' '}
              5 ) */}
            </a>
            <a className="write_review float-end fn-xsd" href="#">
              {trans.detail.danh_gia.viet_danh_gia}
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
            <h4>{trans.detail.danh_gia.viet_danh_gia}</h4>
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
                onClick={() => {
                  router.push('/login');
                }}
              >
                {/* <Link href="/login"> */}

                <span>{trans.detail.danh_gia.dang_nhap}</span>
                {/* </Link> */}
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
