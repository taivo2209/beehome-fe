const IncomesData = () => {
    return (
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Date</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col">Income</th>
          </tr>
        </thead>
        {/* End thead */}
  
        <tbody>
          <tr>
            <th scope="row">15/05/2003</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>400.000đ</td>
          </tr>
          <tr>
            <th scope="row">19/05/2003</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>630.000đ</td>
          </tr>
          {/* End tr */}
        </tbody>
      </table>
    );
  };
  
  export default IncomesData;
  