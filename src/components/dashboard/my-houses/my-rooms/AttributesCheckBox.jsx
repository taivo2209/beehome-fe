import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const AttributesCheckBox = ({ onSelectionChange }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [data, setData] = useState({});
  const [selections, setSelections] = useState([]);
  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/lessor/roomAttribute/term?lang=VN&page=1&limit=20`,
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
  // console.log('tagData', chunkedArray);
  const handleSelectionChange = (event) => {
    const selectedItem = event.target.value;
    if (event.target.checked) {
      setSelections([...selections, selectedItem]);
    } else {
      setSelections(selections.filter((item) => item !== selectedItem));
    }
    // onSelectionChange(selections);
  };
  useEffect(() => {
    getData();
    onSelectionChange(selections);
  }, [selections]);
  //   console.log('===',chunkedArray);

  return (
    <div style={{display:'flex'}}>
      {chunkedArray?.map((chunk,i) => (
        <>
          {console.log('chunk', chunk)}
          <div className="col-xxs-6 col-sm col-lg col-xl" key={i}>
            <ul className="ui_kit_checkbox selectable-list">
              {chunk?.map((item) => (
                <li key={item.id}>
                  {/* {console.log('item', item.categoryTypes)} */}
                  <div className="form-check custom-checkbox">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customCheck1"
                      onChange={handleSelectionChange}
                      value={item.id}
                    />
                    <label className="form-check-label" htmlFor="customCheck1">
                      {item.roomAttributeTermDetails?.[0]?.name}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* End .col */}
        </>
      ))}
    </div>
  );
};

export default AttributesCheckBox;
