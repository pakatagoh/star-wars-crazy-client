import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.h2`
  font-weight: bold;
  line-height: 1.4;
`;

const Title = ({ title, as, children, className }) => {
  const classes = `${className ? className : ''}`;

  return (
    <Wrapper as={as && as} className={classes}>
      {children || title}
    </Wrapper>
  );
};

export default Title;
