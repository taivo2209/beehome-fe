import { useEffect, useState } from 'react';
import selectedFiles from '../../../utils/selectedFiles';
import axios from 'axios';

const PropertyMediaUploader = ({ onUpload }) => {
  const [propertySelectedImgs, setPropertySelectedImgs] = useState([]);
  const [imgArr, setImgArr] = useState([]);

  // multiple image select
  const multipleImage = (e) => {
    // checking is same file matched with old stored array
    const isExist = propertySelectedImgs?.some((file1) =>
      selectedFiles(e)?.some((file2) => file1.name === file2.name),
    );

    if (!isExist) {
      setPropertySelectedImgs((old) => [...old, ...selectedFiles(e)]);
      // console.log(selectedFiles(e));
    } else {
      alert('You have selected one image already!');
    }
  };

  const uploadImages = () => {
    const formData = new FormData();

    for (let i = 0; i < propertySelectedImgs.length; i++) {
      // console.log("ss");
      formData.append('photo_url', propertySelectedImgs[i]);
    }
    // formData.append("images", propertySelectedImgs[0]);

    axios
      .post('http://localhost:5000/upload-file/multiple-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        // console.log(res.data);
        setImgArr(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    // console.log("ss",formData.getAll("photo_url"));
  };
  // console.log(imgArr);

  // delete image
  const deleteImage = (name) => {
    const deleted = propertySelectedImgs?.filter((file) => file.name !== name);
    setPropertySelectedImgs(deleted);
  };

  // console.log(propertySelectedImgs);

  useEffect(() => {
    uploadImages();
  }, [propertySelectedImgs]);

  useEffect(() => {
    if (imgArr.length > 0) {
      onUpload(imgArr);
    }
  }, [imgArr, onUpload]);

  return (
    <div className="row">
      <div className="col-lg-12">
        <ul className="mb-0">
          {propertySelectedImgs.length > 0
            ? propertySelectedImgs?.map((item, index) => (
                <li key={index} className="list-inline-item">
                  <div className="portfolio_item">
                    <img
                      className="img-fluid cover"
                      src={URL.createObjectURL(item)}
                      alt="fp1.jpg"
                    />
                    <div
                      className="edu_stats_list"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Delete"
                      data-original-title="Delete"
                    >
                      <a onClick={() => deleteImage(item.name)}>
                        <span className="flaticon-garbage"></span>
                      </a>
                    </div>
                  </div>
                </li>
              ))
            : undefined}

          {/* End li */}
        </ul>
      </div>
      {/* End .col */}

      <div className="col-lg-12">
        <div className="portfolio_upload">
          <input
            type="file"
            onChange={multipleImage}
            multiple
            accept="image/png, image/gif, image/jpeg"
          />
          <div className="icon">
            <span className="flaticon-download"></span>
          </div>
          <p>Drag and drop images here</p>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default PropertyMediaUploader;
