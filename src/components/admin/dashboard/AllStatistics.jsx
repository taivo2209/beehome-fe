import { useState } from 'react';
import useTrans from '../../../pages/hooks/useTran';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';

const AllStatistics = () => {
  const trans = useTrans();
  const [data, setData] = useState();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const getStatic = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/admin/statistical`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStatic();
  }, []);

  const allStatistics = [
    {
      id: 1,
      blockStyle: '',
      icon: 'flaticon-home',
      timer: `${data?.amountBoardingHouse}`,
      name: `${trans.admin.thong_ke.nha}`,
    },
    {
      id: 2,
      blockStyle: 'style2',
      icon: 'flaticon-user',
      timer: `${data?.amountLessor}`,
      name: `${trans.admin.thong_ke.chu_nha}`,
    },
    {
      id: 3,
      blockStyle: 'style3',
      icon: 'flaticon-user',
      timer: `${data?.amountCustomer}`,
      name: `${trans.admin.thong_ke.khach_hang}`,
    },
    {
      id: 4,
      blockStyle: 'style4',
      icon: 'flaticon-chat',
      timer: `${data?.amountReport}`,
      name: `${trans.admin.thong_ke.bao_cao}`,
    },
  ];

  return (
    <>
      {allStatistics.map((item) => (
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3" key={item.id}>
          <div className={`ff_one ${item.blockStyle}`}>
            <div className="detais">
              <div className="timer">{item.timer}</div>
              <p>{item.name}</p>
            </div>
            <div className="icon">
              <span className={item.icon}></span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllStatistics;
