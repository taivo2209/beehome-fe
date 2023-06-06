import axios from 'axios';
export const fetchCommentData = async (boardingHouseId) => {
  try {
    const res = await axios.get(
      `https://beehome.herokuapp.com/customer/comment/${boardingHouseId}`,
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
