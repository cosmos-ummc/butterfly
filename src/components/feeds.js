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
import {PATIENT_MENTAL_STATUS} from "./patients";

export const FeedList = props => (
    <List
        filters={<CustomFilter/>}
        {...props}
        title={"Health Feed"}>
        <Datagrid rowClick='show'>
            <TextField source="title"/>
            <SelectField source="type" choices={PATIENT_MENTAL_STATUS}/>
        </Datagrid>
    </List>
);

export const FeedCreate = props => (
    <Create undoable={false} {...props} successMessage={STRING.FEED_CREATED} title={"Health Feeds"}>
        <SimpleForm>
            <TextInput source="title" fullWidth/>
            <TextInput source="description" fullWidth multiline/>
            <TextInput source="link"/>
            <TextInput source="imgPath" label="Image Path"/>
            <SelectInput source="type" choices={PATIENT_MENTAL_STATUS} initialValue={'1'}/>
        </SimpleForm>
    </Create>
);

export const FeedEdit = props => (
    <Edit undoable={false} {...props} successMessage={STRING.FEED_UPDATED}>
        <SimpleForm>
            <TextInput source="title"/>
            <TextInput source="description"/>
            <TextInput source="link"/>
            <TextInput source="imgPath" label="Image Path"/>
            <SelectInput source="type" choices={PATIENT_MENTAL_STATUS}/>
        </SimpleForm>
    </Edit>
);
