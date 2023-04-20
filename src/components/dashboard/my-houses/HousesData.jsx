import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FormView from './FormView';
import FormEdit from './FormEdit';
import FormAdd from './FormAdd';

// import { setCategories } from '../../../features/categories/categoriesSlice';

const HousesData = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/lessor/boardingHouse?page=1&limit=20',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setData(res.data);
      // console.log(accessToken);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (houseId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/lessor/boardingHouse/${houseId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      // console.log(res.data);
      // Call getData() again to update the table after deletion
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="col-md-4 col-lg-4 col-xl-3 mb20">
        <ul className="sasw_list mb0">
          <FormAdd />
        </ul>
      </div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Houses</th>
            <th className="dn-lg" scope="col"></th>
            <th className="dn-lg" scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col">Created</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {/* End thead */}

        <tbody>
          {data.items &&
            data.items.map((item) => (
              <tr key={item.id} className="title" scope="row">
                <td>{item.name}</td>
                <td className="dn-lg"></td>
                <td className="dn-lg"></td>
                <td></td>
                <td></td>
                <td className="para">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <ul className="view_edit_delete_list mb0">
                    <li
                      className="list-inline-item"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="View"
                    >
                      <a href="#">
                        {/* <span className="flaticon-view"></span> */}
                        <FormView id={item.id} />
                        {/* {console.log(item.categoryId)} */}
                      </a>
                    </li>
                    <li
                      className="list-inline-item"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                    >
                      <a href="#">
                        <span className="flaticon-edit"></span>
                        {/* <FormEdit id={item.id} /> */}
                      </a>
                    </li>
                    <li
                      className="list-inline-item"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                    >
                      <a href="#">
                        <span
                          className="flaticon-garbage"
                          onClick={() => handleDelete(item.id)}
                        ></span>
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
        </tbody>
        {/* End tbody */}
      </table>
    </>
  );
};

export default HousesData;