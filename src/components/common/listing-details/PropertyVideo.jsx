import { useState } from 'react';
import ModalVideo from 'react-modal-video';
import useTrans from '../../../pages/hooks/useTran';

const PropertyVideo = ({ videoUrl }) => {
  const [isOpen, setOpen] = useState(false);
  const url = videoUrl && new URL(videoUrl);
  const searchParams = url?.search && new URLSearchParams(url.search);
  const idVideo = searchParams?.get('v');
  const trans = useTrans();
  // console.log(idVideo);
  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={idVideo}
        onClose={() => setOpen(false)}
      />
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            data-bs-toggle="tab"
            href="#description"
            role="tab"
          >
            {trans.detail.video}
          </a>
        </li>
      </ul>
      {/* End .nav-tabs */}

      <div className="tab-content" id="myTabContent2">
        <div
          className="tab-pane fade show active"
          id="description"
          role="tabpanel"
        >
          <div className="property_video">
            <div className="thumb">
              <img
                className="pro_img img-fluid w100"
                src="/assets/images/background/7.jpg"
                alt="7.jpg"
              />
              <div className="overlay_icon">
                <div
                  onClick={() => setOpen(true)}
                  role="button"
                  className="video_popup_btn red popup-youtube"
                >
                  <span className="flaticon-play"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End .tab-conten */}
    </>
  );
};

export default PropertyVideo;
