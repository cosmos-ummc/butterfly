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
    SelectField,
} from "react-admin";
import {messagePopupStrings as STRING} from "./common/strings";

const TOPIC_CHOICES = [
    {id: "gastrointestinal", name: 'Gastro Intestinal'},
];

export const WikipediaList = props => (
    <List
        filters={<WikipediaFilter/>}
        {...props}>
        <Datagrid rowClick='show'>
            <SelectField source="topic" choices={TOPIC_CHOICES}/>
            <TextField source="terms"/>
            <TextField source="explanations"/>
        </Datagrid>
    </List>
);

export const WikipediaCreate = props => (
    <Create undoable={false} {...props} successMessage={STRING.WIKIPEDIA_CREATED}>
        <SimpleForm>
            <SelectInput source="topic" choices={TOPIC_CHOICES} initialValue={'abdominalpain'}/>
            <TextInput source="terms"/>
            <TextInput source="explanations" fullWidth multiline/>
        </SimpleForm>
    </Create>
);

export const WikipediaEdit = props => (
    <Edit undoable={false} {...props} successMessage={STRING.WIKIPEDIA_UPDATED}>
        <SimpleForm>
            <SelectInput source="topic" choices={TOPIC_CHOICES} initialValue={'abdominalpain'}/>
            <TextInput source="terms"/>
            <TextInput source="explanations" fullWidth multiline/>
        </SimpleForm>
    </Edit>
);

const WikipediaFilter = props => (
    <Filter {...props}>
        <TextInput
            label="Search"
            source="q"
            alwaysOn
        />
    </Filter>
);
