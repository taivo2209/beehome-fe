import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CustomerAccount from './CustomerAccount';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setEN, setVI } from '../../../features/langType/langTypeSlice';

const HeaderMenuContent = ({ float = '' }) => {
  const route = useRouter();
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
          <span className="title">Lang</span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu ">
          <li>
            <div
              onClick={() => dispatch(setVI('vi'))}
              className={'vi' === typeData ? 'ui-active' : undefined}
            >
              vi
            </div>
          </li>
          <li>
            <div
              onClick={() => dispatch(setEN('en'))}
              className={'en' === typeData ? 'ui-active' : undefined}
            >
              en
            </div>
          </li>
        </ul>
      </li>
      {/* End .dropitem */}

      <li className="dropitem">
        <Link href={'/'}>
          <span className="title">Home</span>
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
              <img
                className="rounded-circle"
                src={newPath}
                alt="img"
                width={45}
                height={45}
              />
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
            <span className="dn-lg">Login/Register</span>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default HeaderMenuContent;
