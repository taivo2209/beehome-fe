import axios from 'axios';
export const fetchCustomerData = async (accessToken) => {
  try {
    const res = await axios.get(`http://localhost:5000/customer/auth/current`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
