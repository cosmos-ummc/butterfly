import React from 'react';
import {
    List,
    Edit,
    Datagrid,
    TextField,
    SimpleForm,
    TextInput,
    SelectInput,
    SelectField,
    ReferenceField,
    SimpleFormIterator,
    ArrayField,
    ReferenceInput,
} from "react-admin";
import {messagePopupStrings as STRING} from "./common/strings";
import {CustomFilter} from "./filter";
import {MyDateField} from "./common/dateField";

export const DECLARATION_CATEGORY = [
    {id: "dass", name: 'DASS'},
    {id: "iers", name: 'IES-R'},
];

export const DECLARATION_STATUS = [
    {id: "", name: '-'},
    {id: "0", name: '-'},
    {id: "1", name: 'Normal'},
    {id: "2", name: 'Mild'},
    {id: "3", name: 'Moderate'},
    {id: "4", name: 'Severe'},
    {id: "5", name: 'Extremely Severe'},
];

export const DeclarationList = props => (
    <List
        filters={<CustomFilter/>}
        {...props}
        sort={{field: 'submittedAt', order: 'DESC'}}
        title={"Reports"}
    >
        <Datagrid rowClick='show'>
            <ReferenceField source="patientId" reference="patients" label="NRIC/Passport" link="show">
                <TextField source="id"/>
            </ReferenceField>
            <ReferenceField source="patientId" reference="patients" label="Name" link="show">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField source="patientId" reference="patients" label="Phone Number" link="show">
                <TextField source="phoneNumber"/>
            </ReferenceField>
            <SelectField source="category" choices={DECLARATION_CATEGORY}/>
            <TextField source="score"/>
            <SelectField source="status" choices={DECLARATION_STATUS}/>
            <MyDateField source="submittedAt" showTime label="Submitted At"/>
        </Datagrid>
    </List>
);

export const DeclarationEdit = props => (
    <Edit undoable={false} {...props} successMessage={STRING.DECLARATION_UPDATED} title={"Report #" + props.id}>
        <SimpleForm>
            <MyDateField source="submittedAt" showTime label="Submitted At"/>
            <ReferenceField source="patientId" reference="patients" label="NRIC/Passport" link="show">
                <TextField source="id"/>
            </ReferenceField>
            <ReferenceField source="patientId" reference="patients" label="Name" link="show">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField source="patientId" reference="patients" label="Phone Number" link="show">
                <TextField source="phoneNumber"/>
            </ReferenceField>
            <ArrayField source="result" label="Results">
                <Datagrid>
                    <ReferenceField source="id" reference="questions" label="Question" link="show">
                        <TextField source="content"/>
                    </ReferenceField>
                    <TextField source="score"/>
                </Datagrid>
            </ArrayField>

            <SelectInput source="category" choices={DECLARATION_CATEGORY} initialValue={'dass'} disabled/>
            <TextInput source="score" disabled/>
            <SelectInput source="status" choices={DECLARATION_STATUS} initialValue={'1'} disabled/>
            <TextInput
                source="doctorRemarks"
                multiline
                label="Doctor's Note"
            />
        </SimpleForm>
    </Edit>
);
