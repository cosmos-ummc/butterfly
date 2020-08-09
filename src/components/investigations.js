import React from 'react';
import {
    List,
    Create,
    Edit,
    Datagrid,
    TextField,
    SimpleForm,
    TextInput,
    Filter,
} from "react-admin";
import {messagePopupStrings as STRING} from "./common/strings";

export const InvestigationList = props => (
    <List
        filters={<InvestigationFilter/>}
        {...props}>
        <Datagrid rowClick='show'>
            <TextField source="question"/>
        </Datagrid>
    </List>
);

export const InvestigationCreate = props => (
    <Create undoable={false} {...props} successMessage={STRING.INVESTIGATION_CREATED}>
        <SimpleForm>
            <TextInput source="question"/>
        </SimpleForm>
    </Create>
);

export const InvestigationEdit = props => (
    <Edit undoable={false} {...props} successMessage={STRING.INVESTIGATION_UPDATED}>
        <SimpleForm>
            <TextInput source="question"/>
        </SimpleForm>
    </Edit>
);

const InvestigationFilter = props => (
    <Filter {...props}>
        <TextInput
            label="Search"
            source="q"
            alwaysOn
        />
    </Filter>
);
