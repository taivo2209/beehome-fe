import Link from "next/link";
import { useRouter } from "next/router";
import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../../utils/daynamicNavigation";
import useTrans from "../../../../pages/hooks/useTran";

const SidebarMenu = () => {
  const route = useRouter();
  const trans = useTrans();
  const lessorManage = [
    { id: 1, name: `${trans.lessor.sidebar.nha}`, route: "/my-houses", icon: "flaticon-house" },
    // { id: 2, name: "Categories", route: "/my-categories" },
    { id: 2, name: `${trans.lessor.sidebar.tien_ich}`, route: "/my-attributes", icon: "flaticon-tick"},
    // { id: 3, name: "Tags", route: "/my-tags", icon: "flaticon-pin" },
    { id: 4, name: `${trans.lessor.sidebar.lich_hen}`, route: "/my-bookings",icon: "flaticon-calendar" },
    { id: 5, name: `${trans.lessor.sidebar.ngay_nghi}`, route: "/busy-date",icon: "flaticon-calendar" },
  ];

  const manageAccount = [
    {
      id: 1,
      name: `${trans.lessor.sidebar.tk_cua_toi}`,
      route: "/my-profile",
      icon: "flaticon-user",
    },
    {
      id: 2,
      name: `${trans.lessor.sidebar.thanh_vien}`,
      route: "/membership",
      icon: "flaticon-box",
    },
    {
      id: 3,
      name: `${trans.lessor.sidebar.hoa_don}`,
      route: "/my-bill",
      icon: "flaticon-transfer",
    },
    { id: 4, name: `${trans.lessor.sidebar.dang_xuat}`, route: "/login", icon: "flaticon-logout" },
  ];
  
  return <>
    <ul className="sidebar-menu">
      <li className="sidebar_header header">
        <Link href="/my-houses">

          <img
            src="/assets/images/header-logo2.png"
            alt="header-logo2.png"
          />
          <span>BeeHome</span>

        </Link>
      </li>
      {/* End header */}

      <li className="title">
        <span>{trans.lessor.sidebar.danh_sach}</span>
        <ul>
          {/* <li
            className={`treeview ${
              isParentPageActive(myProperties, route.pathname) ? "active" : ""
            }`}
          >
            <a data-bs-toggle="collapse" href="#my-property">
              <i className="flaticon-home"></i> <span>My Properties</span>
              <i className="fa fa-angle-down pull-right"></i>
            </a>
            <ul className="treeview-menu collapse" id="my-property">
              {myProperties.map((item) => (
                <li key={item.id}>
                  <Link href={item.route}>

                    <i className="fa fa-circle"></i> {item.name}

                  </Link>
                </li>
              ))}
            </ul>
          </li> */}

          <li
            className={`treeview ${
              isParentPageActive(lessorManage, route.pathname) ? "active" : ""
            }`}
          >
            <a data-bs-toggle="collapse" href="#my-property">
              <i className="flaticon-plus"></i> <span>{trans.lessor.sidebar.quan_ly}</span>
              <i className="fa fa-angle-down pull-right"></i>
            </a>
            <ul className="treeview-menu collapse" id="my-property">
              {lessorManage.map((item) => (
                <li key={item.id}>
                  <Link href={item.route}>

                    <i className={item.icon}></i> {item.name}

                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* <li
            className={`treeview ${
              isParentPageActive(reviews, route.pathname) ? "active" : ""
            }`}
          >
            <a data-bs-toggle="collapse" href="#review">
              <i className="flaticon-chat"></i>
              <span>Reviews</span>
              <i className="fa fa-angle-down pull-right"></i>
            </a>
            <ul className="treeview-menu collapse" id="review">
              {reviews.map((item) => (
                <li key={item.id}>
                  <Link href={item.route}>

                    <i className="fa fa-circle"></i> {item.name}

                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li
            className={`treeview ${
              isSinglePageActive("/my-favourites", route.pathname)
                ? "active"
                : ""
            }`}
          >
            <Link href="/my-favourites">

              <i className="flaticon-magnifying-glass"></i>
              <span> My Favorites</span>

            </Link>
          </li>
          <li
            className={`treeview ${
              isSinglePageActive("/my-saved-search", route.pathname)
                ? "active"
                : ""
            }`}
          >
            <Link href="/my-saved-search">

              <i className="flaticon-magnifying-glass"></i>
              <span> Saved Search</span>

            </Link>
          </li> */}
        </ul>
      </li>

      <li className="title">
        <span>{trans.lessor.sidebar.quan_ly_tk}</span>
        <ul>
          {manageAccount.map((item) => (
            <li
              className={
                isSinglePageActive(item.route, route.pathname) ? "active" : ""
              }
              key={item.id}
            >
              <Link href={item.route}>

                <i className={item.icon}></i> <span>{item.name}</span>

              </Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  </>;
};

export default SidebarMenu;
