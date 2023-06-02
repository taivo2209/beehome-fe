import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  isParentPageActive,
  isSinglePageActive,
} from '../../../../utils/daynamicNavigation';
import useTrans from '../../../../pages/hooks/useTran';

const SidebarMenu = () => {
  const route = useRouter();
  const trans = useTrans();
  const adminManage = [
    {
      id: 1,
      name: `${trans.admin.sidebar.quan_ly_cn}`,
      route: '/manage-lessor',
      icon: 'flaticon-user',
    },
    {
      id: 2,
      name: `${trans.admin.sidebar.quan_ly_kh}`,
      route: '/manage-customer',
      icon: 'flaticon-user',
    },
    {
      id: 3,
      name: `${trans.admin.sidebar.quan_ly_bc}`,
      route: '/manage-report',
      icon: 'flaticon-chat',
    },
    {
      id: 4,
      name: `${trans.admin.sidebar.quan_ly_nha}`,
      route: '/manage-house',
      icon: 'flaticon-home',
    },
  ];

  const manageAccount = [
    {
      id: 1,
      name: `${trans.admin.sidebar.dang_xuat}`,
      route: '/login',
      icon: 'flaticon-logout',
    },
  ];

  return (
    <>
      <ul className="sidebar-menu">
        <li className="sidebar_header header">
          <Link href="/manage-lessor">
            <img src="/assets/images/header-logo2.png" alt="header-logo2.png" />
            <span>BeeHome</span>
          </Link>
        </li>
        {/* End header */}

        <li className="title">
          <span>Main</span>
          <ul>
            <li
              className={`treeview ${
                isSinglePageActive('/dashboard', route.pathname) ? 'active' : ''
              }`}
            >
              <Link href="/dashboard">
                <i className="flaticon-layers"></i>
                <span> {trans.admin.sidebar.thong_ke}</span>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive('/manage-income', route.pathname)
                  ? 'active'
                  : ''
              }`}
            >
              <Link href="/manage-income">
                <i className="flaticon-money-bag"></i>
                <span> {trans.admin.sidebar.doanh_thu}</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* End Main */}

        <li className="title">
          <span>{trans.admin.sidebar.quan_ly}</span>
          <ul>
            <li
              className={`treeview ${
                isParentPageActive(adminManage, route.pathname) ? 'active' : ''
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-property">
                <i className="flaticon-plus"></i>{' '}
                <span>{trans.admin.sidebar.quan_ly}</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-property">
                {adminManage.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className={item.icon}></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </li>

        <li className="title">
          <span>{trans.lessor.sidebar.quan_ly_tk}</span>
          <ul>
            {manageAccount.map((item) => (
              <li
                className={
                  isSinglePageActive(item.route, route.pathname) ? 'active' : ''
                }
                key={item.id}
              >
                <Link href={item.route}>
                  <i className={item.icon}></i> <span> {item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
};

export default SidebarMenu;
