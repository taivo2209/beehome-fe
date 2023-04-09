import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CategoriesData = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [data, setData] = useState([]);
  const [categoryType, setCategoryType] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/lessor/category?page=1&limit=20",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th scope="col">Categories</th>
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
          data.items.map((item) =>
            item.categoryDetails.map((categoryDetail, i) => (
              <tr key={i}>
                <th>{categoryDetail.name}</th>
                <td className="dn-lg"></td>
                <td className="dn-lg"></td>
                <td></td>
                <td></td>
                <td className="para">
                  {new Date(categoryDetail.createdAt).toLocaleDateString()}
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
                        <span
                          className="flaticon-view"
                        ></span>
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
                      </a>
                    </li>
                    <li
                      className="list-inline-item"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                    >
                      <a href="#">
                        <span className="flaticon-garbage"></span>
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
            ))
          )}
        {/* {categoryType && (
          <tr>
            <td>Category Type:</td>
            <td>{categoryType}</td>
          </tr>
        )} */}
      </tbody>
      {/* End tbody */}
    </table>
  );
};

export default CategoriesData;
