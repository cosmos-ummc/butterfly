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
    SelectField,
} from "react-admin";
import {messagePopupStrings as STRING} from "./common/strings";
import {CustomFilter} from "./filter";

export const GAME_TYPE = [
    {id: "android", name: "Android"},
    {id: "ios", name: "iOS"},
];

export const GameList = props => (
    <List
        filters={<CustomFilter/>}
        {...props}
        title={"Games"}>
        <Datagrid rowClick='show'>
            <TextField source="link"/>
            <SelectField source="type" choices={GAME_TYPE}/>
        </Datagrid>
    </List>
);

export const GameCreate = props => (
    <Create undoable={false} {...props} successMessage={STRING.GAME_CREATED} title={"Game"}>
        <SimpleForm>
            <TextInput source="link"/>
            <TextInput source="imgPath" label="Image Path"/>
            <SelectInput source="type" choices={GAME_TYPE} initialValue={'android'}/>
        </SimpleForm>
    </Create>
);

export const GameEdit = props => (
    <Edit undoable={false} {...props} successMessage={STRING.GAME_UPDATED}>
        <SimpleForm>
            <TextInput source="link"/>
            <TextInput source="imgPath" label="Image Path"/>
            <SelectInput source="type" choices={GAME_TYPE}/>
        </SimpleForm>
    </Edit>
);
