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

export const GameList = props => (
    <List
        filters={<CustomFilter/>}
        {...props}
        title={"Games"}>
        <Datagrid rowClick='show'>
            <TextField source="linkAdr" label="Android Link"/>
            <TextField source="linkIos" label="iOS Link"/>
        </Datagrid>
    </List>
);

export const GameCreate = props => (
    <Create undoable={false} {...props} successMessage={STRING.GAME_CREATED} title={"Game"}>
        <SimpleForm>
            <TextInput source="imgPathAdr" label="Android Image Path"/>
            <TextInput source="linkAdr" label="Android Link"/>
            <TextInput source="imgPathIos" label="iOS Image Path"/>
            <TextInput source="linkIos" label="iOS Link"/>
        </SimpleForm>
    </Create>
);

export const GameEdit = props => (
    <Edit undoable={false} {...props} successMessage={STRING.GAME_UPDATED}>
        <SimpleForm>
            <TextInput source="imgPathAdr" label="Android Image Path"/>
            <TextInput source="linkAdr" label="Android Link"/>
            <TextInput source="imgPathIos" label="iOS Image Path"/>
            <TextInput source="linkIos" label="iOS Link"/>
        </SimpleForm>
    </Edit>
);
