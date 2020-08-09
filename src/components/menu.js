import React from 'react';
import {MenuItemLink, UserMenu} from 'react-admin';
import FaceIcon from '@material-ui/icons/Face';
import GroupSharpIcon from '@material-ui/icons/GroupSharp';
import {getName} from '../utils/util'

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const UserName = React.forwardRef(({onClick}, ref) => (
    <MenuItemLink
        ref={ref}
        to="#"
        primaryText={getName()}
        leftIcon={<FaceIcon/>}
    />
));
const Role = React.forwardRef(({onClick}, ref) => (
    <MenuItemLink
        ref={ref}
        to="#"
        primaryText={capitalize(localStorage.getItem("role"))}
        leftIcon={<GroupSharpIcon/>}
    />
));
export const CustomUserMenu = props => (
    <UserMenu {...props}>
        <UserName/>
        <Role/>
    </UserMenu>
);

