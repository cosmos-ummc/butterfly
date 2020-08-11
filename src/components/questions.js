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
    Show,
    SimpleShowLayout,
} from "react-admin";
import {messagePopupStrings as STRING} from "./common/strings";
import {CustomFilter} from "./filter";

const QUESTION_CATEGORY = [
    {id: "dass", name: 'DASS'},
    {id: "iers", name: 'IES-R'},
];

const QUESTION_TYPE = [
    {id: "none", name: 'None'},
    {id: "stress", name: 'Stress'},
    {id: "anxiety", name: 'Anxiety'},
    {id: "depression", name: 'Depression'},
];

const QuestionExtentList = (props, resource, basePath) => (
    <Show {...props} title={" "}>
        <SimpleShowLayout>
            <TextField source="id"/>
        </SimpleShowLayout>
    </Show>
);

export const QuestionList = props => (
    <List
        filters={<CustomFilter/>}
        {...props}>
        <Datagrid rowClick='show' expand={<QuestionExtentList/>}>
            <SelectField source="category" choices={QUESTION_CATEGORY}/>
            <SelectField source="type" choices={QUESTION_TYPE}/>
            <TextField source="content"/>
        </Datagrid>
    </List>
);

export const QuestionCreate = props => (
    <Create undoable={false} {...props} successMessage={STRING.QUESTION_CREATED}>
        <SimpleForm>
            <SelectInput source="category" choices={QUESTION_CATEGORY} initialValue={'dass'}/>
            <SelectInput source="type" choices={QUESTION_TYPE} initialValue={'none'}/>
            <TextInput source="content"/>
        </SimpleForm>
    </Create>
);

export const QuestionEdit = props => (
    <Edit undoable={false} {...props} successMessage={STRING.QUESTION_UPDATED}>
        <SimpleForm>
            <SelectInput source="category" choices={QUESTION_CATEGORY} initialValue={'dass'}/>
            <SelectInput source="type" choices={QUESTION_TYPE} initialValue={'none'}/>
            <TextInput source="content"/>
        </SimpleForm>
    </Edit>
);
