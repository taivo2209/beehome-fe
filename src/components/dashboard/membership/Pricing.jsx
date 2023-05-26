import axios from 'axios';
import clsx from 'clsx';
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

  const isDisabled = (mem, type) => {
    if (mem === type) {
      return true;
    }
    if (mem === 'FREE') {
      return false;
    }
    if (mem === 'BASIC' && type === 'PREMIUM') {
      return false;
    }
    return true;
  };

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
        return (
          <div className="col-sm-6 col-md-6 col-lg-4" key={item.id}>
            <div
              className={
                member === item.title ? 'pricing_table' : 'pricing_table_use'
              }
            >
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
                <button
                  className={clsx('btn pricing_btn btn-block', {
                    ['disabled']: isDisabled(member, item.title),
                  })}
                >
                  {member === item.title ? 'My Package' : 'Select'}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Pricing;
