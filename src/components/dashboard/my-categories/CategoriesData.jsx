import { useSelector } from "react-redux";

const CategoriesData = () => {
  const accessToken = useSelector(state => state.auth.accessToken)
  fetch('http://localhost:5000/api/swagger', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return (
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th scope="col">Search</th>
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
        <tr>
          <th className="title" scope="row">
            List London
          </th>
          <td className="dn-lg"></td>
          <td className="dn-lg"></td>
          <td></td>
          <td></td>
          <td className="para">December 30, 2019</td>
          <td>
            <ul className="view_edit_delete_list mb0">
              <li
                className="list-inline-item"
                data-toggle="tooltip"
                data-placement="top"
                title="View"
              >
                <a href="#">
                  <span className="flaticon-view"></span>
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
        {/* End tr */}
      </tbody>
      {/* End tbody */}
    </table>
  );
};

export default CategoriesData;
