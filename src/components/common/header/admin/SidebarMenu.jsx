import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  isParentPageActive,
  isSinglePageActive,
} from '../../../../utils/daynamicNavigation';

const SidebarMenu = () => {
  const route = useRouter();

  const adminManage = [
    {
      id: 1,
      name: 'Manage Lessor',
      route: '/manage-lessor',
      icon: 'flaticon-user',
    },
    {
      id: 2,
      name: 'Manage Customer',
      route: '/manage-customer',
      icon: 'flaticon-user',
    },
    {
      id: 3,
      name: 'Manage Report',
      route: '/manage-report',
      icon: 'flaticon-chat',
    },
  ];

  const manageAccount = [
    { id: 1, name: 'Logout', route: '/login', icon: 'flaticon-logout' },
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
                <span> Dashboard</span>
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
                <span> Income</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* End Main */}

        <li className="title">
          <span>Admin Manage</span>
          <ul>
            <li
              className={`treeview ${
                isParentPageActive(adminManage, route.pathname) ? 'active' : ''
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-property">
                <i className="flaticon-plus"></i> <span>Admin Manage</span>
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
          <span>Manage Account</span>
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
