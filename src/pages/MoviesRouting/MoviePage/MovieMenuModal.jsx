import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, ModalBody } from 'reactstrap';
import MoviePageNav from './MoviePageNav';

const StyledMenuButton = styled.button`
  width: 4rem;
  height: 4rem;
  font-size: 0.8rem;
  position: fixed;
  z-index: 2;
  bottom: 2rem;
  right: 2rem;
  border-radius: 50% 50%;
  border: none;
  color: black;
  background-color: ${({ theme }) => (theme.primary ? theme.primary : 'white')};
  box-shadow: 0 2px 13px 1px rgba(0, 0, 0, 0) 4;
`;

const contentBgBlack = 'content-bg-black';
const StyledModal = styled(Modal).attrs({
  contentClassName: contentBgBlack,
})`
  background-color: black;
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
      <StyledMenuButton onClick={handleToggle}>Episodes</StyledMenuButton>
      <StyledModal
        isOpen={modal}
        toggle={handleToggle}
        className="m-0 h-100"
        contentClassName={`h100 rounded-0 ${contentBgBlack}`}
        scrollable="true"
      >
        <ModalBody>
          <div>
            <MoviePageNav handleClick={handleNav} />
          </div>
        </ModalBody>
        <StyledMenuButton onClick={handleToggle}>Close</StyledMenuButton>
      </StyledModal>
    </div>
  );
};

export default MovieMenuModal;
