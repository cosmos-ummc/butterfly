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

export const EXAM_TYPE = [
    {id: "general", name: 'General'},
    {id: "vital", name: 'Vital'},
    {id: "face", name: 'Face'},
    {id: "peripheral", name: 'Peripheral'},
    {id: "abdominal", name: 'Abdominal'},
    {id: "rectal", name: 'Rectal'},
    {id: "cardiorespiratory", name: 'Cardiorespiratory'},
];

export const ExaminationList = props => (
    <List
        filters={<ExaminationFilter/>}
        {...props}>
        <Datagrid rowClick='show'>
            <TextField source="question"/>
            <SelectField source="type" choices={EXAM_TYPE}/>
        </Datagrid>
    </List>
);

export const ExaminationCreate = props => (
    <Create undoable={false} {...props} successMessage={STRING.EXAMINATION_CREATED}>
        <SimpleForm>
            <TextInput source="question"/>
            <SelectInput source="type" choices={EXAM_TYPE} initialValue={'general'}/>
        </SimpleForm>
    </Create>
);

export const ExaminationEdit = props => (
    <Edit undoable={false} {...props} successMessage={STRING.EXAMINATION_UPDATED}>
        <SimpleForm>
            <TextInput source="question"/>
            <SelectInput source="type" choices={EXAM_TYPE} initialValue={'general'}/>
        </SimpleForm>
    </Edit>
);

const ExaminationFilter = props => (
    <Filter {...props}>
        <TextInput
            label="Search"
            source="q"
            alwaysOn
        />
    </Filter>
);
