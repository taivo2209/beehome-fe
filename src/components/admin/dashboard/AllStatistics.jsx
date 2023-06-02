import useTrans from "../../../pages/hooks/useTran";

const AllStatistics = () => {
  const trans = useTrans();
  const allStatistics = [
    {
      id: 1,
      blockStyle: "",
      icon: "flaticon-home",
      timer: "14",
      name: `${trans.admin.thong_ke.nha}`,
    },
    {
      id: 2,
      blockStyle: "style2",
      icon: "flaticon-user",
      timer: "14",
      name: `${trans.admin.thong_ke.chu_nha}`,
    },
    {
      id: 3,
      blockStyle: "style3",
      icon: "flaticon-user",
      timer: "4",
      name: `${trans.admin.thong_ke.khach_hang}`,
    },
    {
      id: 4,
      blockStyle: "style4",
      icon: "flaticon-chat",
      timer: "0",
      name: `${trans.admin.thong_ke.bao_cao}`,
    },
  ];

  return (
    <>
      {allStatistics.map((item) => (
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3" key={item.id}>
          <div className={`ff_one ${item.blockStyle}`}>
            <div className="detais">
              <div className="timer">{item.timer}</div>
              <p>{item.name}</p>
            </div>
            <div className="icon">
              <span className={item.icon}></span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllStatistics;
