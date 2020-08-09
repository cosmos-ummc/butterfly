import React from 'react';
import {Route} from 'react-router-dom';
import PasswordResetForm from './passwordResetForm'

export default [
    <Route path="/resetpassword" component={PasswordResetForm} noLayout/>,
];
