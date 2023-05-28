import Link from 'next/link';
import { useRouter } from 'next/router';
import useTrans from '../../../../pages/hooks/useTran';
import { useDispatch, useSelector } from 'react-redux';
import { setEN, setVI } from '../../../../features/langType/langTypeSlice';

const HeaderMenuContent = ({ float = '' }) => {
  const route = useRouter();
  const trans = useTrans();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const customer = useSelector((state) => state.customer.data);
  const { typeData } = useSelector((state) => state.langType);

  const home = [
    {
      id: 1,
      name: 'Home 1',
      routerPath: '/',
    },
    { id: 2, name: 'Home 2', routerPath: '/home-2' },
    {
      id: 3,
      name: 'Home 3',
      routerPath: '/home-3',
    },
    { id: 4, name: 'Home 4', routerPath: '/home-4' },
    { id: 5, name: 'Home 5', routerPath: '/home-5' },
    { id: 6, name: 'Home 6', routerPath: '/home-6' },
    { id: 7, name: 'Home 7', routerPath: '/home-7' },
    { id: 8, name: 'Home 8', routerPath: '/home-8' },
    { id: 9, name: 'Home 9', routerPath: '/home-9' },
    { id: 10, name: 'Home 10', routerPath: '/home-10' },
  ];


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
    </ul>
  );
};

export default HeaderMenuContent;
