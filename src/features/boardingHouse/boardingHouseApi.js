import axios from 'axios';

export const fetchBoardingHouseData = async () => {
  try {
    const res = await axios.get(
      `https://beehome.herokuapp.com/customer/boardingHouse?lang=VN&page=1&limit=20`,
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
