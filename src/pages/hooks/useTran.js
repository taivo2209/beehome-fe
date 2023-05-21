import vi from '../../../public/lang/vi.js';
import en from '../../../public/lang/en.js';
import { useSelector } from 'react-redux';

const useTrans = () => {
  const { typeData } = useSelector((state) => state.langType);
  const locale = typeData;
  const trans = locale === 'vi' ? vi : en;

  return trans;
};

export default useTrans;
