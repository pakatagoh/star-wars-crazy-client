import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import MoviePageNav from './MoviePageNav';

const StyledMenuButton = styled.button`
  width: 2rem;
  height: 2rem;
  position: fixed;
  z-index: 2;
  bottom: 2rem;
  right: 2rem;
  border-radius: 50% 50%;
`;

const bgBlack = 'bg-black';
const StyledModal = styled(Modal).attrs({
  contentClassName: bgBlack,
})`
  & .${bgBlack} {
    background-color: black;
  }
`;

const MovieMenuModal = props => {
  const { handleClick } = props;
  const [modal, setModal] = useState(false);

  const handleToggle = () => {
    setModal(modal => !modal);
  };

  const handleNav = () => {
    handleClick();
    handleToggle();
  };

  return (
    <div>
      <StyledMenuButton onClick={handleToggle}>Menu</StyledMenuButton>
      <StyledModal
        isOpen={modal}
        toggle={handleToggle}
        className="m-0"
        contentClassName={`rounded-0 bg-black`}
        scrollable
      >
        <ModalHeader toggle={handleToggle}>Modal title</ModalHeader>
        <ModalBody>
          <MoviePageNav handleClick={handleNav} />
        </ModalBody>
      </StyledModal>
    </div>
  );
};

export default MovieMenuModal;
