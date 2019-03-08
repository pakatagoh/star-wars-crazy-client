import React from 'react';
import styled from 'styled-components';

const Title = ({ title, as, children }) => {
  const Wrapper = styled.h2`
    font-weight: bold;
  `;

  return <Wrapper as={as && as}>{children || title}</Wrapper>;
};

export default Title;
