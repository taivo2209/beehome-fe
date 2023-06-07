import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import CopyrightFooter from '../../components/common/footer/CopyrightFooter';
import Footer from '../../components/common/footer/Footer';
import Header from '../../components/common/header/DefaultHeader';
import MobileMenu from '../../components/common/header/MobileMenu';
import DetailsContent from '../../components/listing-details-v1/DetailsContent';
import Sidebar from '../../components/listing-details-v1/Sidebar';
import Seo from '../../components/common/seo';
import { useSelector } from 'react-redux';
import useTrans from '../hooks/useTran';

const ListingDynamicDetailsV1 = () => {
  const { data } = useSelector((state) => state.boardingHouses);
  const dataStar = useSelector((state) => state.boardingHouseStar.data);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const customer = useSelector((state) => state.customer.data);
  const dataSearch = useSelector((state) => state.dataSearch);
  const dataSource = useSelector((state) => state.dataSource);
  const trans = useTrans();
  const router = useRouter();
  const id = router.query.id;
  let boardingHouseDetail;
  if (dataSource.typeData === 'dataSearch') {
    boardingHouseDetail = dataSearch.data?.filter((item) => item.id == id);
  }
  if (dataSource.typeData === 'dataStar') {
    boardingHouseDetail = dataStar?.filter((item) => item.id == id);
  }

  if (dataSource.typeData === 'dataBoardingHouse') {
    boardingHouseDetail = data?.filter((item) => item.id == id);
  }
  const saveViewedItem = (item) => {
    let viewedItems = JSON.parse(localStorage.getItem('viewedItems')) || [];

    // Nếu item đã tồn tại, loại bỏ item này khỏi danh sách
    viewedItems = viewedItems.filter(
      (viewedItem) => viewedItem[0]?.id !== item[0]?.id,
    );

    // Thêm item vào đầu danh sách
    if (item) viewedItems.unshift(item);

    // Giới hạn số lượng item trong danh sách là 6
    if (viewedItems.length > 6) {
      viewedItems.pop();
    }

    localStorage.setItem('viewedItems', JSON.stringify(viewedItems));
  };
  const [dataBoarding, setData] = useState({});
  const floorData = useSelector((state) => state.floors);
  useEffect(() => {
    saveViewedItem(boardingHouseDetail);
    setData(data);
  }, []);
  return (
    <>
      <Seo pageTitle="Property Detail" />

      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Hình ảnh các phòng + địa chỉ giá cả + tên của tòa --> */}
      <section className="listing-title-area mt85 md-mt0">
        <div className="container">
          <Gallery>
            <div className="row mb30">
              <div className="col-lg-7 col-xl-8">
                <div className="single_property_title mt30-767">
                  <h2>{boardingHouseDetail?.[0]?.title}</h2>
                  <p>{boardingHouseDetail?.[0]?.location}</p>
                </div>
              </div>
              <div className="col-lg-5 col-xl-4">
                <div className="single_property_social_share position-static transform-none">
                  <div className="price float-start fn-400">
                    <h2>
                      {trans.from}{' '}
                      {boardingHouseDetail?.[0]?.price.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        '.',
                      )}
                      <small>{trans.detail.gia_thang}</small>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            {/* End .row */}

            <div className="row">
              <div className="col-sm-7 col-lg-8">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="spls_style_two mb30-520">
                      <Item
                        original={boardingHouseDetail?.[0]?.itemDetails[0]}
                        thumbnail={boardingHouseDetail?.[0]?.itemDetails[0]}
                        width={752}
                        height={450}
                      >
                        {({ ref, open }) => (
                          <div role="button" ref={ref} onClick={open}>
                            <img
                              className="img-fluid w100 cover lds-1"
                              src={boardingHouseDetail?.[0]?.itemDetails[0]}
                              alt="1.jpg"
                            />
                          </div>
                        )}
                      </Item>
                    </div>
                  </div>
                </div>
              </div>
              {/* End .col-sm-7 .col-lg-8 */}

              <div className="col-sm-5 col-lg-4">
                <div className="row">
                  {boardingHouseDetail?.[0]?.itemDetails
                    .slice(1)
                    .map((val, i) => (
                      <div className="col-6" key={i}>
                        <div className="spls_style_two img-gallery-box mb24">
                          <Item
                            original={val}
                            thumbnail={val}
                            width={752}
                            height={450}
                          >
                            {({ ref, open }) => (
                              <div role="button" ref={ref} onClick={open}>
                                <img
                                  className="img-fluid w100"
                                  src={val}
                                  alt="2.jpg"
                                />
                              </div>
                            )}
                          </Item>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {/* End  col-sm-5 col-lg-4 */}
            </div>
            {/* End .row */}
          </Gallery>
        </div>
      </section>

      {/* <!-- Chi tiết phòng : Mô tả , tiền điện , nước , dịch vụ . Tiện ích chung :......... , 
      Vị trí:.............. , Rule:....................., Deposit:..................  --> */}
      <section className="our-agent-single bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <DetailsContent
                customer={customer}
                floor={floorData[0]}
                dataDetail={boardingHouseDetail?.[0]}
                boardingHouseId={id}
                pic={boardingHouseDetail?.[0]?.itemDetails?.[0]}
              />
            </div>
            {/* End details content .col-lg-8 */}

            <div className="col-lg-4 col-xl-4">
              <Sidebar
                floor={floorData[0]}
                data={floorData?.[0]?.boardingHouse}
                customer={customer}
                posterId={boardingHouseDetail?.[0]?.posterId}
                poster={boardingHouseDetail?.[0]}
                accessToken={accessToken}
                boardingHouseId={id}
              />
            </div>
            {/* End sidebar content .col-lg-4 */}
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default ListingDynamicDetailsV1;
