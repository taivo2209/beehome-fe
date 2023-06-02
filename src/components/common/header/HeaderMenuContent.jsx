import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CustomerAccount from './CustomerAccount';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setEN, setVI } from '../../../features/langType/langTypeSlice';
import useTrans from '../../../pages/hooks/useTran';

const HeaderMenuContent = ({ float = '' }) => {
  const trans = useTrans();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const customer = useSelector((state) => state.customer.data);
  const { typeData } = useSelector((state) => state.langType);
  const [data, setData] = useState([]);
  let path = data?.avatar?.path;
  let newPath = path?.replace(/\\/g, '/');

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

  useEffect(() => {
    getData();
  }, []);

  return (
    <ul
      id="respMenu"
      className="ace-responsive-menu text-end d-lg-block d-none"
      data-menu-style="horizontal"
    >
      {/* End .dropitem */}

      <li className="dropitem">
        <a>
          <span className="title" style={{ cursor: 'pointer' }}>
            {trans.header.ngon_ngu}
          </span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu ">
          <li>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => dispatch(setVI('vi'))}
              className={'vi' === typeData ? 'ui-active' : undefined}
            >
              VI
            </div>
          </li>
          <li>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => dispatch(setEN('en'))}
              className={'en' === typeData ? 'ui-active' : undefined}
            >
              EN
            </div>
          </li>
        </ul>
      </li>
      {/* End .dropitem */}

      <li className="dropitem">
        <Link href={'/'}>
          <span className="title">{trans.header.trang_chu}</span>
        </Link>
      </li>

      {customer != null ? (
        <li className="user_setting">
          <div className="dropdown">
            <a
              className="btn dropdown-toggle"
              href="#"
              data-bs-toggle="dropdown"
            >
              {newPath ? (
                <img
                  className="rounded-circle"
                  src={newPath}
                  alt="img"
                  width={45}
                  height={45}
                />
              ) : (
                <img
                  className="rounded-circle"
                  src="assets/images/avatar.png"
                  alt="img"
                  width={45}
                  height={45}
                />
              )}
              <span className="dn-1199 ms-1"></span>
            </a>
            <div className="dropdown-menu">
              <CustomerAccount />
            </div>
          </div>
        </li>
      ) : (
        <li className={`list-inline-item list_s ${float}`}>
          <Link href="/login" className="btn flaticon-user">
            <span className="dn-lg">{trans.header.dang_nhap_dang_ky}</span>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default HeaderMenuContent;
