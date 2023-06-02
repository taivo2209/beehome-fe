import Link from 'next/link';
import { useRouter } from 'next/router';
import { isSinglePageActive } from '../../../../utils/daynamicNavigation';
import useTrans from '../../../../pages/hooks/useTran';

const AdminAccount = () => {
  const route = useRouter();
  const trans = useTrans();

  const profileMenuItems = [
    { id: 1, name: `${trans.lessor.sidebar.dang_xuat}`, routerPath: '/login' },
  ];


  return (
    <>
      {/* End user_set_header */}

      <div className="user_setting_content">
        {profileMenuItems.map((item) => (
          <Link
            href={item.routerPath}
            key={item.id}
            className="dropdown-item"
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

export default AdminAccount;
