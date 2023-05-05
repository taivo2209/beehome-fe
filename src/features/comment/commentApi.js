import axios from 'axios';
export const fetchCommentData = async (boardingHouseId) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/customer/comment/${boardingHouseId}`,
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
