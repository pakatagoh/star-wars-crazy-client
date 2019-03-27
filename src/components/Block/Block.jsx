import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: ${props => (props.spacer ? props.spacer : 5)}rem;
  padding-bottom: ${props => (props.spacer ? props.spacer : 5)}rem;
`;

const Block = props => {
  const { spacer, className, container, children } = props;

  const classes = `${className ? className : ''} ${container ? 'container' : ''}`;
  return (
    <Wrapper className={classes} spacer={spacer}>
      {children}
    </Wrapper>
  );
};

export default Block;
