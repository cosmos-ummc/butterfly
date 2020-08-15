import React from 'react';
import {
    List,
    Create,
    Edit,
    Datagrid,
    TextField,
    SimpleForm,
    TextInput,
    BooleanInput, SelectInput,
} from "react-admin";
import {messagePopupStrings as STRING} from './common/strings';
import {CustomFilter} from "./filter";

const USER_ROLE = [
    {id: "admin", name: "Admin"},
    {id: "superuser", name: "Superuser"},
    {id: "consultant", name: "Consultant"},
];

export const UserList = props => (
    <List
        filters={<CustomFilter/>}
        {...props}
        title={"Admins"}
    >
        <Datagrid rowClick='show'>
            <TextField source="name"/>
            <TextField source="email"/>
            <TextField source="phoneNumber"/>
        </Datagrid>
    </List>
);

export const UserCreate = props => (
    <Create undoable={false} {...props} successMessage={STRING.USER_CREATED} title={"Admin"}>
        <SimpleForm>
            <TextInput source="name"/>
            <TextInput source="email"/>
            <TextInput source="phoneNumber"/>
            <TextInput type={"password"} source="password"/>
            <TextInput type={"password"} source="cmfpassword" label="Confirm Password"/>
            <SelectInput source="role" choices={USER_ROLE} initialValue='admin'/>
        </SimpleForm>
    </Create>
);

export const UserEdit = props => (
    <Edit undoable={false} {...props} successMessage={STRING.USER_UPDATED} title={"Admin"}>
        <SimpleForm>
            <TextInput source="name"/>
            <TextInput source="phoneNumber"/>
            <TextInput source="email"/>
            <BooleanInput source="verified"/>
            <SelectInput source="role" choices={USER_ROLE} initialValue='admin'/>
        </SimpleForm>
    </Edit>
);
