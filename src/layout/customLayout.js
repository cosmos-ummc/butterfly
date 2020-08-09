import React from 'react'
import {Layout} from 'react-admin';
import {MyAppBar} from "../components/appBar";

const CustomLayout = (props) => <Layout
    {...props}
    appBar={MyAppBar}
/>;

export default CustomLayout;
