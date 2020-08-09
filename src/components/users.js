import React from 'react';
import {
    List,
    Create,
    Edit,
    Datagrid,
    TextField,
    SimpleForm,
    TextInput,
    SelectInput,
    Filter,
    useNotify,
    BooleanField,
    BooleanInput,
    SelectField,
} from "react-admin";

import Button from '@material-ui/core/Button';

import {messagePopupStrings as STRING} from './common/strings';
import {apiUrl, httpClient} from '../data_provider/dataProvider';

export const ROLE_NAME = {
    admin: 'Admin',
    student: 'Student'
};

export const ROLE_CHOICES = [
    {id: "superuser", name: 'Superuser'},
    {id: "admin", name: 'Admin'},
    {id: "student", name: 'Student'},
];

const validateEditInput = (params) => {
    const errors = {};
    if (!params.role || params.role === "") {
        errors.role = ['role cannot be empty!'];
    }
    if (!params.name || params.name === "") {
        errors.name = ['displayName cannot be empty!'];
    }
    if (!params.phoneNumber || params.phoneNumber === "") {
        errors.phoneNumber = ['phoneNumber cannot be empty!'];
    }
    if (!params.email || params.email === "") {
        errors.email = ['email cannot be empty!'];
    }

    return errors
};


const validateCreateInput = (params) => {
    const errors = {};
    if (!params.role || params.role === "") {
        errors.role = ['role cannot be empty!'];
    }
    if (!params.name || params.name === "") {
        errors.name = ['displayName cannot be empty!'];
    }
    if (!params.phoneNumber || params.phoneNumber === "") {
        errors.phoneNumber = ['phoneNumber cannot be empty!'];
    }
    if (!params.email || params.email === "") {
        errors.email = ['email cannot be empty!'];
    }
    if (!params.password || params.password === "") {
        errors.password = ['password cannot be empty!'];
    }
    if (params.password !== params.cmfpassword) {
        errors.cmfpassword = ['Password not same!']
    }

    return errors
};

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
        filters={<UserFilter/>}
        {...props}>
        <Datagrid rowClick='show'>
            <TextField source="name"/>
            <SelectField source="role" choices={ROLE_CHOICES}/>
            <TextField source="email"/>
            <TextField source="phoneNumber"/>
            <TextField source="matricNumber"/>
            <TextField source="grade"/>
            <BooleanField source="verified"/>
        </Datagrid>
    </List>
);

export const UserCreate = props => (
    <Create undoable={false} {...props} successMessage={STRING.USER_CREATED}>
        <SimpleForm validate={validateCreateInput}>
            <TextInput source="name"/>
            <SelectInput source="role" choices={ROLE_CHOICES} initialValue={'admin'}/>
            <TextInput source="phoneNumber"/>
            <TextInput source="email"/>
            <TextInput source="matricNumber"/>
            <TextInput source="grade"/>
            <TextInput type={"password"} source="password"/>
            <TextInput type={"password"} source="cmfpassword" label="Confirm Password"/>
        </SimpleForm>
    </Create>
);

// todo: to override delete message https://github.com/marmelab/react-admin/issues/4219
// how come they will available for create and edit only :(
export const UserEdit = props => (
    <Edit undoable={false} {...props} successMessage={STRING.USER_UPDATED}>
        <SimpleForm validate={validateEditInput}>
            <SelectInput source="role" choices={ROLE_CHOICES}/>
            <TextInput source="name"/>
            <TextInput source="phoneNumber"/>
            <TextInput source="email"/>
            <TextInput source="matricNumber"/>
            <TextInput source="grade"/>
            <BooleanInput source="verified"/>
            <ResetPasswordField/>
        </SimpleForm>
    </Edit>
);

const UserFilter = props => (
    <Filter {...props}>
        <TextInput
            label="Search"
            source="q"
            alwaysOn
        />
    </Filter>
);
