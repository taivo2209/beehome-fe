import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import DetailFloor from './detailFloor';
import * as React from 'react';
import DetailRoom from './detailRoom';
import { useState } from 'react';
import FormBookDayToMeet from './formToMeet';
import useTrans from '../../../pages/hooks/useTran';

const DetailBoardingHouse = ({
  isOpen,
  toggle,
  data,
  customer,
  posterId,
  floor,
}) => {
  const trans = useTrans();
  const { className } = PropTypes.string;

  //-----------------------------------------------------------------------------------------

  const [detailIsOpen, setDetailIsOpen] = useState(false);
  const [formToMeet, setFormToMeet] = useState(false);
  const [dataRoom, setDataRoom] = useState({});
  const HandleFormToMeet = () => {
    setFormToMeet(!formToMeet);
  };
  const HandleDetailIsOpen = (data) => {
    setDataRoom(data);
    setDetailIsOpen(!detailIsOpen);
  };
  const handleToggle = () => {
    toggle();
    setDetailIsOpen(false);
    setFormToMeet(false);
  };
  //-----------------------------------------------------------------------------------------

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
      <ModalHeader toggle={toggle}></ModalHeader>
      <ModalBody
        style={{
          height: '70vh',
          width: '100%',
        }}
      >
        {formToMeet ? (
          <FormBookDayToMeet
            customer={customer}
            dataRoom={dataRoom}
            posterId={posterId}
            data={data}
          />
        ) : detailIsOpen ? (
          <DetailRoom
            openFormToMeet={HandleFormToMeet}
            dataRoom={dataRoom}
            floor={floor}
          />
        ) : (
          <DetailFloor setDetailIsOpen={HandleDetailIsOpen} data={data} />
        )}

        {/* <DetailFloor /> */}
      </ModalBody>
      <ModalFooter>
        {formToMeet ? (
          ''
        ) : detailIsOpen ? (
          <Button className="btn_orange" onClick={() => HandleDetailIsOpen()}>
            {trans.tro_lai}
          </Button>
        ) : (
          ''
        )}

        <Button className="btn_orange" onClick={() => handleToggle()}>
          {trans.huy_bo}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DetailBoardingHouse;
