import React from 'react';
import Block from '../../components/Block/Block';
import Title from '../../components/Typography/Title';

const PageNotFound = () => {
  return (
    <main>
      <Block container spacer={2}>
        <Title as="h1">Page Not Found</Title>
      </Block>
    </main>
  );
};

export default PageNotFound;
