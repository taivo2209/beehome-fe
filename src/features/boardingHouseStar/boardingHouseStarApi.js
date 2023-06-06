import axios from 'axios';

export const fetchBoardingHouseStarData = async () => {
  try {
    const res = await axios.get(
      `https://beehome.herokuapp.com/customer/boardingHouse/star?lang=VN&page=1&limit=20`,
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
