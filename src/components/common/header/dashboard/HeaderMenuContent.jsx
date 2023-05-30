import MyAccount from './MyAccount';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { setEN, setVI } from '../../../../features/langType/langTypeSlice';
import useTrans from '../../../../pages/hooks/useTran';

const HeaderMenuContent = ({ float = '' }) => {
  const trans = useTrans();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { typeData } = useSelector((state) => state.langType);
  const [data, setData] = useState([]);
  let path = data?.avatar;
  let newPath = path?.replace(/\\/g, '/');

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

  useEffect(() => {
    getData();
  }, []);

  return (
    <ul
      id="respMenu"
      className="ace-responsive-menu text-end d-lg-block d-none"
      data-menu-style="horizontal"
    >
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

      <li className="user_setting">
        <div className="dropdown">
          <a className="btn dropdown-toggle" href="#" data-bs-toggle="dropdown">
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
                alt="avatar.png"
                width={45}
                height={45}
              />
            )}
            <span className="dn-1199 ms-1"></span>
          </a>
          <div className="dropdown-menu">
            <MyAccount />
          </div>
        </div>
      </li>
      {/* End ."user_setting */}

      {/* <li className={`list-inline-item add_listing ${float}`}>
        <Link href="/create-listing">
          <span className="flaticon-plus"></span>
          <span className="dn-lg"> Create Listing</span>
        </Link>
      </li> */}
      {/* End .dropitem */}
    </ul>
  );
};

export default HeaderMenuContent;
