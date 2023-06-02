import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFeatured,
  addStatusType,
} from '../../../features/filter/filterSlice';
import useTrans from '../../../pages/hooks/useTran';

const FilterTopBar = () => {
  const trans = useTrans();
  const { length } = useSelector((state) => state.properties);
  const { statusType, featured } = useSelector((state) => state.filter);
  const [getStatus, setStatus] = useState(statusType);
  const [getFeatured, setFeatured] = useState(featured);

  const dispatch = useDispatch();

  // add status
  useEffect(() => {
    dispatch(addStatusType(getStatus));
  }, [dispatch, addStatusType, getStatus]);

  // add featured
  useEffect(() => {
    dispatch(addFeatured(getFeatured));
  }, [dispatch, addFeatured, getFeatured]);

  // clear filter
  useEffect(() => {
    statusType === '' && setStatus('');
    featured === '' && setFeatured('');
  }, [statusType, setStatus, featured, setFeatured]);

  return (
    <>
      <div className="col-sm-12 col-md-4 col-lg-4 col-xl-5">
        <div className="left_area tac-xsd">
          <p>
            <span className={length === 0 ? 'text-danger' : undefined}>
              {length}{' '}
            </span>
            {length !== 0 ? (
              `${trans.tim_duoc}`
            ) : (
              <span className="text-danger">{trans.khong_tim}</span>
            )}
          </p>
        </div>
      </div>
      {/* End .col */}

      {/* End .col */}
    </>
  );
};

export default FilterTopBar;
