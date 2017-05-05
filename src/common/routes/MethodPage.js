import React from 'react';
import MethodContainer from '../../client/components/MethodContainer/MethodContainer';

const MethodPage = ({ name }) => <MethodContainer name={name} />;

MethodPage.defaultProps = { name: 'Espresso' };

export default MethodPage;
