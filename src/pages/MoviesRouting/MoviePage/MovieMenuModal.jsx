import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, ModalBody } from 'reactstrap';
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

const contentBgBlack = 'content-bg-black';
const StyledModal = styled(Modal).attrs({
  contentClassName: contentBgBlack,
})`
  & .${contentBgBlack} {
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
      <StyledMenuButton onClick={handleToggle}>Episode Menu</StyledMenuButton>
      <StyledModal
        isOpen={modal}
        toggle={handleToggle}
        className="m-0 h-100"
        contentClassName={`h-100 rounded-0 ${contentBgBlack}`}
        scrollable="true"
        centered
      >
        {/* <ModalHeader toggle={handleToggle}>Modal title</ModalHeader> */}
        <ModalBody>
          <div className="d-flex">
            <MoviePageNav handleClick={handleNav} />
          </div>
        </ModalBody>
      </StyledModal>
    </div>
  );
};

export default MovieMenuModal;
