import {
  DatePicker,
  DigitalClock,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useTrans from '../../../pages/hooks/useTran';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Ho_Chi_Minh'); // Set default timezone
function FormDateSelect({ customer, setBook, data }) {
  const trans = useTrans();
  const [selectedDate, setSelectedDate] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleDateChange = (date) => {
    setSelectedDate(dayjs(date).tz('Asia/Ho_Chi_Minh').set('hour', 9));
  };

  const handleTimeChange = (time) => {
    if (selectedDate) {
      setSelectedDate(
        selectedDate
          .tz('Asia/Ho_Chi_Minh')
          .set('hour', time.$H)
          .set('minute', time.$m),
      );
    }
  };

  const disableDates = data?.user?.bookDisables.map((item) => {
    return new Date(item.dateDisable);
  });
  // console.log(disableDates);

  const disablePastDates = (date) => {
    const today = dayjs().tz('Asia/Ho_Chi_Minh');
    const maxDate = today.add(14, 'day');
    return (
      date < today ||
      date > maxDate ||
      disableDates?.some((disabledDate) =>
        dayjs(disabledDate).tz('Asia/Ho_Chi_Minh').isSame(date, 'day'),
      )
    );
  };

  const max = dayjs().tz('Asia/Ho_Chi_Minh').set('hour', 14).startOf('hour');
  const min = dayjs().tz('Asia/Ho_Chi_Minh').set('hour', 9).startOf('hour');

  useEffect(() => {
    setBook({ ...customer, dateMeet: selectedDate?.format() });
  }, [selectedDate]);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={trans.booking.chon}
              inputFormat="dd/MM/yyyy"
              shouldDisableDate={disablePastDates}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
        </div>
        <div style={{ width: '50%' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DigitalClock
              className="time_select"
              views={['hours', 'minutes']}
              ampm={true}
              minutesStep={5}
              hoursStartWithZero
              defaultValue={min}
              maxTime={max}
              minTime={min}
              onChange={handleTimeChange}
            />
          </LocalizationProvider>
        </div>
      </div>
    </>
  );
}

export default FormDateSelect;
