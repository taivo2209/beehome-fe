import useTrans from '../../pages/hooks/useTran';
import BreadCrumb from '../common/BreadCrumb';

const BreadCrumb2 = () => {
  const trans = useTrans();
  return (
    <div className="breadcrumb_content style2">
      <BreadCrumb title="Simple Listing – Grid V1" />
      <h2 className="breadcrumb_title">{trans.danh_sach_tk}</h2>
    </div>
  );
};

export default BreadCrumb2;
