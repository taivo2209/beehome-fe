import axios from 'axios';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Pricing = () => {
  const [data, setData] = useState();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [price, setPrice] = useState();
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

  const getPrice = async (e) => {
    try {
      const res = await axios.get(`http://localhost:5000/vn-pay/vnpay_price?status=${e}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPrice(res.data);
      Swal.fire({
        title: `${price}`,
        confirmButtonText: 'OK',
      });
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
        '1 Bài đăng',
        'Hiển thị tối đa 7 ngày',
        'Không được hỗ trợ',
      ],
    },
    {
      id: 2,
      price: '400000',
      title: 'BASIC',
      features: [
        '50 Bài đăng',
        'Hiển thị kéo dài hơn 2 tháng',
        'Hỗ trợ trong giờ hành chính',
      ],
    },
    {
      id: 3,
      price: '1000000',
      title: 'PREMIUM',
      features: [
        'Không giới hạn bài đăng',
        'Hiển thị đến khi được thuê hết phòng',
        'Hỗ trợ mọi lúc trừ Chủ nhật',
      ],
    },
  ];

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
                  onClick={()=>getPrice(item.title)}
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
