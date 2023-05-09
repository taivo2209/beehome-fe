import Link from "next/link";
import { useRouter } from "next/router";
import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../../utils/daynamicNavigation";

const SidebarMenu = () => {
  const route = useRouter();

  const lessorManage = [
    { id: 1, name: "Boarding House", route: "/my-houses" },
    { id: 2, name: "Categories", route: "/my-categories" },
    { id: 3, name: "Attributes", route: "/my-attributes" },
    { id: 4, name: "Tags", route: "/my-tags" },
    { id: 5, name: "Bookings", route: "/my-bookings" },
  ];

  const manageAccount = [
    {
      id: 1,
      name: "My Profile",
      route: "/my-profile",
      icon: "flaticon-user",
    },
    { id: 2, name: "Logout", route: "/login", icon: "flaticon-logout" },
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
        <span>Main</span>
        <ul>
          {/* <li
            className={`treeview ${
              isSinglePageActive("/my-dashboard", route.pathname)
                ? "active"
                : ""
            }`}
          >
            <Link href="/my-dashboard">

              <i className="flaticon-layers"></i>
              <span> Dashboard</span>

            </Link>
          </li> */}
          {/* <li
            className={`treeview ${
              isSinglePageActive("/create-listing", route.pathname)
                ? "active"
                : ""
            }`}
          >
            <Link href="/create-listing">

              <i className="flaticon-plus"></i>
              <span> Create Listing</span>

            </Link>
          </li> */}
          {/* <li
            className={`treeview ${
              isSinglePageActive("/my-categories", route.pathname)
                ? "active"
                : ""
            }`}
          >
            <Link href="/my-categories">

              <i className="flaticon-plus"></i>
              <span> Lessor Categories</span>

            </Link>
          </li>
          <li
            className={`treeview ${
              isSinglePageActive("/my-attributes", route.pathname)
                ? "active"
                : ""
            }`}
          >
            <Link href="/my-attributes">

              <i className="flaticon-plus"></i>
              <span> Lessor Attributes</span>

            </Link>
          </li>
          <li
            className={`treeview ${
              isSinglePageActive("/my-tags", route.pathname)
                ? "active"
                : ""
            }`}
          >
            <Link href="/my-tags">

              <i className="flaticon-plus"></i>
              <span> Lessor Tags</span>

            </Link>
          </li> */}
          {/* <li
            className={`treeview ${
              isSinglePageActive("/my-message", route.pathname)
                ? "active"
                : ""
            }`}
          >
            <Link href="/my-message">

              <i className="flaticon-envelope"></i>
              <span> Message</span>

            </Link>
          </li> */}
        </ul>
      </li>
      {/* End Main */}

      <li className="title">
        <span>Manage Listings</span>
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
              <i className="flaticon-plus"></i> <span>Lessor Manage</span>
              <i className="fa fa-angle-down pull-right"></i>
            </a>
            <ul className="treeview-menu collapse" id="my-property">
              {lessorManage.map((item) => (
                <li key={item.id}>
                  <Link href={item.route}>

                    <i className="fa flaticon-plus"></i> {item.name}

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
        <span>Manage Account</span>
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
