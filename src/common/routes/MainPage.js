import React from 'react';

const Hello = ({name}) => <div>{name}</div>;

Hello.defaultProps = {
  name: 'World'
};

export default Hello;