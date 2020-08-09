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

export const HISTORY_TYPE = [
    {id: "interview", name: 'Interview'},
    {id: "medical", name: 'Medical History'},
    {id: "personal", name: 'Personal Background'},
    {id: "family", name: 'Family Background'},
];

export const HistoryList = props => (
    <List
        filters={<HistoryFilter/>}
        {...props}>
        <Datagrid rowClick='show'>
            <TextField source="question"/>
            <SelectField source="type" choices={HISTORY_TYPE}/>
        </Datagrid>
    </List>
);

export const HistoryCreate = props => (
    <Create undoable={false} {...props} successMessage={STRING.HISTORY_CREATED}>
        <SimpleForm>
            <TextInput source="question"/>
            <SelectInput source="type" choices={HISTORY_TYPE} initialValue={'interview'}/>
        </SimpleForm>
    </Create>
);

export const HistoryEdit = props => (
    <Edit undoable={false} {...props} successMessage={STRING.HISTORY_UPDATED}>
        <SimpleForm>
            <TextInput source="question"/>
            <SelectInput source="type" choices={HISTORY_TYPE}/>
        </SimpleForm>
    </Edit>
);

const HistoryFilter = props => (
    <Filter {...props}>
        <TextInput
            label="Search"
            source="q"
            alwaysOn
        />
    </Filter>
);
