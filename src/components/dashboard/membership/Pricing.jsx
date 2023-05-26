import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Pricing = () => {
  const [data, setData] = useState();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const member = data?.package;

  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/lessor/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [member]);

  const pricingContent = [
    {
      id: 1,
      price: '0',
      title: 'FREE',
      features: [
        '50 Property Listings',
        '60 Days Availability',
        '20 Featured Property',
        'Limited Support',
      ],
    },
    {
      id: 2,
      price: '190',
      title: 'BASIC',
      features: [
        '50 Property Listings',
        '60 Days Availability',
        '20 Featured Property',
        'Limited Support',
      ],
    },
    {
      id: 3,
      price: '291',
      title: 'PREMIUM',
      features: [
        '50 Property Listings',
        '60 Days Availability',
        '20 Featured Property',
        'Limited Support',
      ],
    },
  ];

  const handleClick = () => {
    Swal.fire({
      icon: 'success',
      title: 'Thanh toán thành công',
      confirmButtonText: 'OK',
    });
  };

  return (
    <>
      {pricingContent.map((item) => {
        if (member === 'FREE' && item.id === 1) {
          return (
            <div className="col-sm-6 col-md-6 col-lg-4" key={item.id}>
              <div className="pricing_table">
                <div className="pricing_header">
                  <div className="price">{item.price}</div>
                  <h4>{item.title}</h4>
                </div>
                <div className="pricing_content">
                  <ul className="mb0">
                    {item.features.map((val, i) => (
                      <li key={i}>{val}</li>
                    ))}
                  </ul>
                </div>
                <div className="pricing_footer">
                  <a
                    className="btn pricing_btn btn-block"
                  >
                    Your Package
                  </a>
                </div>
              </div>
            </div>
          );
        } else if (member === 'BASIC' && item.id === 2) {
          return (
            <div className="col-sm-6 col-md-6 col-lg-4" key={item.id}>
              <div className="pricing_table">
                <div className="pricing_header">
                  <div className="price">{item.price}đ</div>
                  <h4>{item.title}</h4>
                </div>
                <div className="pricing_content">
                  <ul className="mb0">
                    {item.features.map((val, i) => (
                      <li key={i}>{val}</li>
                    ))}
                  </ul>
                </div>
                <div className="pricing_footer">
                  <a
                    className="btn pricing_btn btn-block"
                    onClick={handleClick}
                  >
                    Your Package
                  </a>
                </div>
              </div>
            </div>
          );
        } else if (member === 'PREMIUM' && item.id === 3) {
          return (
            <div className="col-sm-6 col-md-6 col-lg-4" key={item.id}>
              <div className="pricing_table">
                <div className="pricing_header">
                  <div className="price">{item.price}đ</div>
                  <h4>{item.title}</h4>
                </div>
                <div className="pricing_content">
                  <ul className="mb0">
                    {item.features.map((val, i) => (
                      <li key={i}>{val}</li>
                    ))}
                  </ul>
                </div>
                <div className="pricing_footer">
                  <a
                    className="btn pricing_btn btn-block"
                    onClick={handleClick}
                  >
                    Your Package
                  </a>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="col-sm-6 col-md-6 col-lg-4" key={item.id}>
              <div className="pricing_table_use">
                <div className="pricing_header">
                  <div className="price">{item.price}đ</div>
                  <h4>{item.title}</h4>
                </div>
                <div className="pricing_content">
                  <ul className="mb0">
                    {item.features.map((val, i) => (
                      <li key={i}>{val}</li>
                    ))}
                  </ul>
                </div>
                <div className="pricing_footer">
                  <a
                    className="btn pricing_btn btn-block"
                    onClick={handleClick}
                  >
                    Select Package
                  </a>
                </div>
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default Pricing;
