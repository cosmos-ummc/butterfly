import React from 'react';
import {
    List,
    Create,
    Edit,
    Datagrid,
    TextField,
    SimpleForm,
    TextInput,
} from "react-admin";
import {messagePopupStrings as STRING} from "./common/strings";
import {CustomFilter} from "./filter";

export const TipList = props => (
    <List
        filters={<CustomFilter/>}
        {...props}
        title={"Tips"}>
        <Datagrid rowClick='show'>
            <TextField source="title"/>
            <TextField source="description"/>
        </Datagrid>
    </List>
);

export const TipCreate = props => (
    <Create undoable={false} {...props} successMessage={STRING.TIP_CREATED} title={"Tips"}>
        <SimpleForm>
            <TextInput source="title" fullWidth/>
            <TextInput source="description" fullWidth multiline/>
        </SimpleForm>
    </Create>
);

export const TipEdit = props => (
    <Edit undoable={false} {...props} successMessage={STRING.TIP_UPDATED} title={"Tips"}>
        <SimpleForm>
            <TextInput source="title" fullWidth/>
            <TextInput source="description" fullWidth multiline/>
        </SimpleForm>
    </Edit>
);
