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

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Ho_Chi_Minh'); // Set default timezone
function FormDateSelect({ customer, setBook }) {
  const [selectedDate, setSelectedDate] = useState(null);

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

  const disableDates = [
    new Date('2023-05-02'),
    new Date('2023-05-05'),
    new Date('2023-05-09'),
  ];

  const disablePastDates = (date) => {
    const today = dayjs().tz('Asia/Ho_Chi_Minh');
    const maxDate = today.add(14, 'day');
    return (
      date < today ||
      date > maxDate ||
      disableDates.some((disabledDate) =>
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
              label="Select a date"
              inputFormat="dd/MM/yyyy"
              shouldDisableDate={disablePastDates}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
        </div>
        <div style={{ width: '50%' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DigitalClock
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
