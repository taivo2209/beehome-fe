import axios from 'axios';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import useTrans from '../../../pages/hooks/useTran';
import { useRouter } from 'next/router';
import FormPayment from './FormPayment';

const Pricing = () => {
  const router = useRouter();
  const trans = useTrans();
  const [data, setData] = useState();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [price, setPrice] = useState();
  const member = data?.package;
  const orderInfo = router?.query?.vnp_OrderInfo;
  const newOrderInfo = String(orderInfo).split(':')[1];
  const packType = String(newOrderInfo).slice(1);
  const currentDate = new Date();
  const currentDateTimeString = currentDate.toISOString();

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

  const paymentSuccess = async () => {
    if (router?.query?.vnp_TransactionStatus == '00') {
      const formData = {
        packType: packType,
        startDate: currentDateTimeString,
      };
      try {
        const res = await axios.post(
          'http://localhost:5000/lessor/service-pack',
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        Swal.fire({
          icon: 'success',
          title: `${trans.lessor.membership.thanh_toan_tc}`,
          confirmButtonText: 'OK',
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const createBill = async () => {
    if (router?.query?.vnp_TransactionStatus == '00') {
      const formData = {
        packType: packType,
        vnp_Amount: router?.query?.vnp_Amount,
        vnp_BankCode: router?.query?.vnp_BankCode,
        vnp_CardType: router?.query?.vnp_CardType,
        vnp_OrderInfo: router?.query?.vnp_OrderInfo,
        vnp_TransactionNo: router?.query?.vnp_TransactionNo,
        vnp_TxnRef: router?.query?.vnp_TxnRef,
      };
      try {
        const res = await axios.post(
          'http://localhost:5000/vn-pay/create_bill',
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getPrice = async (e) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/lessor/service-pack/service_pack_price?packType=${e}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setPrice(res.data);
    } catch (err) {
      if (err.response && err.response.data.debugInfo.status === 403) {
        setPrice(undefined);
        Swal.fire({
          icon: 'warning',
          title: `${trans.lessor.membership.tg_gia_han}`,
          showConfirmButton: true,
        });
      }
    }
  };

  useEffect(() => {
    getData();
  }, [member]);

  useEffect(() => {
    paymentSuccess();
  }, []);

  useEffect(() => {
    createBill();
  }, []);

  const isDisabled = (mem, type) => {
    if (mem === type) {
      return false;
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
      features: ['1 Bài đăng', 'Hiển thị tối đa 7 ngày', 'Không được hỗ trợ'],
    },
    {
      id: 2,
      price: '400.000đ',
      title: 'BASIC',
      features: [
        '50 Bài đăng',
        'Hiển thị kéo dài hơn 2 tháng',
        'Hỗ trợ trong giờ hành chính',
      ],
    },
    {
      id: 3,
      price: '1.000.000đ',
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
                  onClick={() => getPrice(item.title)}
                >
                  <FormPayment
                    title={item.title}
                    member={member}
                    price={price}
                  />
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
