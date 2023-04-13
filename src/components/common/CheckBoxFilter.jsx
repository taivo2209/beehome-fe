import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const CheckBoxFilter = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [data, setData] = useState({});
  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/lessor/tag?page=1&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const chunkedArray = _.chunk(data.items, 3);
  console.log('tagData', chunkedArray);
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {chunkedArray?.map((chunk) => (
        <>
          <div className="col-xxs-6 col-sm col-lg col-xl">
            <ul className="ui_kit_checkbox selectable-list">
              {chunk?.map((item) => (
                <li key={item}>
                  <div className="form-check custom-checkbox">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customCheck1"
                    />
                    <label className="form-check-label" htmlFor="customCheck1">
                      {item.name}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* End .col */}
        </>
      ))}
    </>
  );
};

export default CheckBoxFilter;
