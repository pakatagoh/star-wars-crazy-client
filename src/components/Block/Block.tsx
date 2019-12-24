import React, { PropsWithChildren, HTMLAttributes } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ spacer: number }>`
  padding-top: ${props => (props.spacer ? props.spacer : 5)}rem;
  padding-bottom: ${props => (props.spacer ? props.spacer : 5)}rem;
`;

const Block = (props: PropsWithChildren<{ spacer: number; container: boolean } & HTMLAttributes<HTMLDivElement>>) => {
  const { className, container, ...rest } = props;

  const classes = `${className ? className : ''} ${container ? 'container' : ''}`;
  return <Wrapper className={classes} {...rest} />;
};

export default Block;
