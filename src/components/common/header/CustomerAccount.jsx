import Link from 'next/link';
import { useRouter } from 'next/router';
import { isSinglePageActive } from '../../../utils/daynamicNavigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { clearAccessToken } from '../../../features/auth/authSlice';
import { removeCustomer } from '../../../features/customer/customerSlice';
import useTrans from '../../../pages/hooks/useTran';

const CustomerAccount = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const route = useRouter();
  const trans = useTrans();

  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/customer/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogout = () => {
    dispatch(clearAccessToken());
    dispatch(removeCustomer());

    route.push('/login');
  };

  const profileMenuItems = [
    { id: 1, name: `${trans.header.thong_tin}`, routerPath: '/customer-profile' },
    { id: 2, name: `${trans.header.doi_mk}`, routerPath: '/customer-change-password' },
    { id: 2, name: `${trans.header.dang_xuat}`, onClick: handleLogout },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="user_set_header">
        {/* <img className="float-start" src={newPath} alt="e1.png" /> */}
        <p>
          {data?.firstName} {data?.lastName}
          <br />
          <span className="address">{data?.email}</span>
        </p>
      </div>
      {/* End user_set_header */}

      {/* <div className="user_setting_content">
        {profileMenuItems.map((item) => (
          <Link
            href={item.routerPath}
            key={item.id}
            className="dropdown-item"
            style={
              isSinglePageActive(`${item.routerPath}`, route.pathname)
                ? { color: '#ff5a5f' }
                : undefined
            }
          >
            {item.name}
          </Link>
        ))}
      </div> */}
      <div className="user_setting_content">
        {profileMenuItems.map((item) =>
          item.onClick ? (
            <button
              onClick={item.onClick}
              key={item.id}
              className="dropdown-item"
            >
              {item.name}
            </button>
          ) : (
            <Link
              href={item.routerPath}
              key={item.id}
              className="dropdown-item text-black"
              style={
                isSinglePageActive(`${item.routerPath}`, route.pathname)
                  ? { color: '#ff5a5f' }
                  : undefined
              }
            >
              {item.name}
            </Link>
          ),
        )}
      </div>
    </>
  );
};

export default CustomerAccount;
