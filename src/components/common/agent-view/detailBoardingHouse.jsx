import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import DetailFloor from './detailFloor';
import * as React from 'react';
import DetailRoom from './detailRoom';
import { useState } from 'react';
import FormToMeet from './formToMeet';

const DetailBoardingHouse = ({ isOpen, toggle }) => {
  const { className } = PropTypes.string;
  const closeBtn = (
    <button className="close" onClick={() => handleToggle()} type="button">
      &times;
    </button>
  );
  //-----------------------------------------------------------------------------------------

  const [detailIsOpen, setDetailIsOpen] = useState(false);
  const [formToMeet, setFormToMeet] = useState(false);

  const HandleFormToMeet = () => {
    setFormToMeet(!formToMeet);
  };
  const HandleDetailIsOpen = () => {
    setDetailIsOpen(!detailIsOpen);
  };
  const handleToggle = () => {
    toggle();
    setDetailIsOpen(false);
    setFormToMeet(false);
  };
  //-----------------------------------------------------------------------------------------

  console.log(detailIsOpen);
  return (
    <Modal
      isOpen={isOpen}
      toggle={handleToggle}
      className={className}
      fullscreen="xl"
      size="xl"
      style={{
        width: '1000px',
      }}
    >
      <ModalHeader toggle={toggle} close={closeBtn}>
        Modal title
      </ModalHeader>
      <ModalBody
        style={{
          height: '70vh',
          width: '100%',
        }}
      >
        {formToMeet ? (
          <FormToMeet />
        ) : detailIsOpen ? (
          <DetailRoom openFormToMeet={HandleFormToMeet} />
        ) : (
          <DetailFloor setDetailIsOpen={HandleDetailIsOpen} />
        )}

        {/* <DetailFloor /> */}
      </ModalBody>
      <ModalFooter>
        {formToMeet ? (
          ''
        ) : detailIsOpen ? (
          <Button color="primary" onClick={() => HandleDetailIsOpen()}>
            Do Something
          </Button>
        ) : (
          ''
        )}

        <Button color="secondary" onClick={() => handleToggle()}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DetailBoardingHouse;
