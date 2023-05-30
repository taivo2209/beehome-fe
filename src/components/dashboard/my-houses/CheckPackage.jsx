import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setEndDate } from '../../../features/auth/authSlice';
// import { setEndDate } from '../../../features/auth/authSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const CustomizedSnackbars = () => {
  const [open, setOpen] = React.useState(false);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const currentDate = new Date();
  const currentDateTimeString = currentDate.toISOString();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const checkPackage = async () => {
    try {
      const res = await axios.get('http://localhost:5000/lessor/service-pack', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // setData(res.data);
      if (currentDateTimeString >= res.data?.endDate) {
        setOpen(true);
      }
      // dispatch(setEndDate(res?.data?.endDate.toISOString()));
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    checkPackage();
  }, []);

  return (
    <Stack spacing={5} sx={{ width: '100%', zIndex: '100000' }}>
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CustomizedSnackbars;
