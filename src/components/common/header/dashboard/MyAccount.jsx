import Link from 'next/link';
import { useRouter } from 'next/router';
import { isSinglePageActive } from '../../../../utils/daynamicNavigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import useTrans from '../../../../pages/hooks/useTran';

const MyAccount = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [data, setData] = useState([]);
  const route = useRouter();
  let path = data?.avatar;
  let newPath = path?.replace(/\\/g, '/');
  const trans = useTrans();

  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/lessor/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(res.data);
      // console.log(accessToken);
    } catch (err) {
      console.log(err);
    }
  };
  const profileMenuItems = [
    { id: 1, name: `${trans.lessor.sidebar.tk_cua_toi}`, routerPath: '/my-profile' },
    { id: 2, name: `${trans.lessor.sidebar.dang_xuat}`, routerPath: '/login' },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="user_set_header">
        {/* <img className="float-start" src={newPath} alt="e1.png" /> */}
        <p>
          {data?.name}
          <br />
          <span className="address">{data?.email}</span>
        </p>
      </div>
      {/* End user_set_header */}

      <div className="user_setting_content">
        {profileMenuItems.map((item) => (
          <Link
            href={item.routerPath}
            key={item.id}
            className="dropdown-item color-black"
            style={
              isSinglePageActive(`${item.routerPath}`, route.pathname)
                ? { color: '#ff5a5f' }
                : undefined
            }
          >
            {item.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default MyAccount;
