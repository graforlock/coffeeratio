import React from 'react';
import { Route } from 'react-router';

import Layout from '../layout';

import MainPage from './MainPage';
import MethodPage from './MethodPage';

export default (
  <Route component={Layout}>
    <Route path="/" component={MainPage} />
    <Route path="/:method" component={MethodPage} />
  </Route>
);
