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

export const MeditationList = props => (
    <List
        filters={<CustomFilter/>}
        {...props}
        title={"Meditations"}>
        <Datagrid rowClick='show'>
            <TextField source="link"/>
        </Datagrid>
    </List>
);

export const MeditationCreate = props => (
    <Create undoable={false} {...props} successMessage={STRING.MEDITATION_CREATED} title={"Meditation"}>
        <SimpleForm>
            <TextInput source="link"/>
        </SimpleForm>
    </Create>
);

export const MeditationEdit = props => (
    <Edit undoable={false} {...props} successMessage={STRING.MEDITATION_UPDATED}>
        <SimpleForm>
            <TextInput source="link"/>
        </SimpleForm>
    </Edit>
);
