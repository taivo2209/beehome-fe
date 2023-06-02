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
  const { typeData } = useSelector((state) => state.langType);


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
