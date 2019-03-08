import React from 'react';
import styled from 'styled-components';
const Paragraph = props => {
  const { children, text, className, as } = props;

  const StyledParagraph = styled.p`
    line-height: 1.2;
  `;

  const classes = `${className ? className : ''}`;
  return (
    <StyledParagraph className={classes} as={as && as}>
      {children || text}
    </StyledParagraph>
  );
};

export default Paragraph;
