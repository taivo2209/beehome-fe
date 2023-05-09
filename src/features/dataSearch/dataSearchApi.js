import axios from 'axios';

export const fetchDataSearchData = async (data) => {
  try {
    let url = `http://localhost:5000/customer/boardingHouse?lang=VN&page=1&limit=20`;

    if (data.searchText != undefined) {
      url += `&searchText=${data.searchText}`;
    }
    if (data.province?.name != undefined) {
      url += `&province=${data.province.name}`;
    }
    if (data.ward?.name != undefined) {
      url += `&ward=${data.ward.name}`;
    }
    if (data.district?.name != undefined) {
      url += `&district=${data.district.name}`;
    }
    if (data.startPrice != undefined) {
      url += `&startPrice=${data.startPrice}`;
    }
    if (data.endPrice != undefined) {
      url += `&endPrice=${data.endPrice}`;
    }

    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
