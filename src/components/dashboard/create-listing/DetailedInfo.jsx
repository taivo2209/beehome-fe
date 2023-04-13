import CheckBoxFilter from '../../common/CheckBoxFilter';

const DetailedInfo = () => {
  return (
    <div className="row">
      <div className="col-xl-12">
        <h4 className="mb10">Tag</h4>
      </div>

      <CheckBoxFilter />

      <div className="col-xl-12">
        <div className="my_profile_setting_input overflow-hidden mt20">
          <button className="btn btn1 float-start">Back</button>
          <button className="btn btn2 float-end">Next</button>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default DetailedInfo;
