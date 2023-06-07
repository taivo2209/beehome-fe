import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import React from 'react';
import FormInfoBookDayToMeet from './FormInfo';
import FormDateSelect from './FromDateSelect';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useTrans from '../../../pages/hooks/useTran';
const steps = ['Information', 'Select date time to meet'];
const FormBookDayToMeet = ({ customer, dataRoom, posterId,data }) => {
  const trans = useTrans();
  const [book, setBook] = useState({
    firstName: customer?.firstName,
    lastName: customer?.lastName,
    email: customer?.email,
    phoneNumber: customer?.phoneNumber,
    dateMeet: null,
    userId: posterId,
    roomId: dataRoom?.id,
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === steps.length - 1) {
      if (book.dateMeet === null) {
        return;
      }
      try {
        const result = await Swal.fire({
          title: `${trans.detail.xac_nhan_dat_lich}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: `${trans.detail.co}`,
          cancelButtonText: `${trans.detail.khong}`,
        });
        if (result.isConfirmed) {
          await axios.post('http://localhost:5000/customer/book', book);
          Swal.fire({
            icon: 'success',
            title: `${trans.booking.dat_lich_ok}`,
            text: `${trans.booking.xac_nhan_dat}`,
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: `${trans.booking.loi}`,
          text: `${trans.booking.loi_1}`,
          confirmButtonText: 'OK',
        });
        console.log(error);
      }
    } else {
      // Kiểm tra nếu ngày không được chọn, không chuyển đến bước tiếp theo
      if (activeStep === 0 && !book.dateMeet) {
        return Swal.fire({
          icon: 'error',
          title: `${trans.booking.chon_ngay}`,
          confirmButtonText: 'OK',
        });
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
      <div className="chonngay">
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = { color: '#ee7b35' };

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel className="step_color" {...labelProps}>
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                {activeStep == 0 ? (
                  <FormDateSelect customer={book} setBook={setBook} data={data}/>
                ) : (
                  <FormInfoBookDayToMeet customer={book} setBook={setBook} />
                )}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  style={{ color: '#ee7b35' }}
                  color="primary"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  {trans.tro_lai}
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />

                <Button onClick={handleNext} style={{ color: '#ee7b35' }}>
                  {activeStep === steps.length - 1
                    ? `${trans.finish}`
                    : `${trans.tiep_tuc}`}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
    </>
  );
};

export default FormBookDayToMeet;
