import React from 'react';
import {
    List,
    Create,
    Edit,
    Datagrid,
    TextField,
    SimpleForm,
    TextInput,
    useNotify,
    BooleanInput,
} from "react-admin";

import Button from '@material-ui/core/Button';

import {messagePopupStrings as STRING} from './common/strings';
import {apiUrl, httpClient} from '../data_provider/dataProvider';
import {CustomFilter} from "./filter";

export default function ResetPasswordButton(props) {
    const url = apiUrl + `/users/${props.id}/passwordreset`;
    const notify = useNotify();

    const resetPass = () => {
        httpClient(url)
            .then(response => ({
                status: response.status,
                headers: response.headers,
                data: response.json,
            }))
            .then(({status, headers, data, total}) => {
                if (data && data.error) {
                    notify(`${data.error}`, `warning`);
                } else if (data && data.message) {
                    notify(data.message);
                } else {
                    notify(`Error reset password, please contact admin`, `warning`);
                }
            })
            .catch(err => {
                notify(`Error reset password, please contact admin`, `warning`);
                console.log('Error reset password: fail get backend API: ' + err)
            })
    };
    return (
        <div>
            <Button variant='contained' style={{background: 'orange'}} onClick={resetPass}>Reset User Password</Button>
        </div>
    )
}

const ResetPasswordField = ({record = {}}) => {
    return (
        <ResetPasswordButton id={record.id}/>
    )
};

ResetPasswordField.defaultProps = {
    label: 'Reset Pass',
};

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
    <Create undoable={false} {...props} successMessage={STRING.USER_CREATED} title={"Admins"}>
        <SimpleForm>
            <TextInput source="name"/>
            <TextInput source="email"/>
            <TextInput source="phoneNumber"/>
            <TextInput type={"password"} source="password"/>
            <TextInput type={"password"} source="cmfpassword" label="Confirm Password"/>
        </SimpleForm>
    </Create>
);

export const UserEdit = props => (
    <Edit undoable={false} {...props} successMessage={STRING.USER_UPDATED} title={"Admin #" + props.id}>
        <SimpleForm>
            <TextInput source="name"/>
            <TextInput source="phoneNumber"/>
            <TextInput source="email"/>
            <BooleanInput source="verified"/>
            <ResetPasswordField/>
        </SimpleForm>
    </Edit>
);
