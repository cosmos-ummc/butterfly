import React from 'react';
import {
    List,
    Create,
    Edit,
    Datagrid,
    TextField,
    SimpleForm,
    SelectInput,
    SelectField, ReferenceField, ReferenceInput, TextInput,
} from "react-admin";
import {messagePopupStrings as STRING} from "./common/strings";
import {CustomFilter} from "./filter";

export const MEETING_STATUS = [
    {id: "1", name: 'Pending'},
    {id: "2", name: 'Accepted'},
];

let timeInput = [
    {id: "2020-08-10 2.00 pm - 4.00 pm", name: "2020-08-10 2.00 pm - 4.00 pm"},
    {id: "2020-08-11 2.00 pm - 4.00 pm", name: "2020-08-11 2.00 pm - 4.00 pm"},
];

export const MeetingList = props => (
    <List
        filters={<CustomFilter/>}
        {...props}
        sort={{field: 'time', order: 'DESC'}}
    >
        <Datagrid rowClick='show'>
            <ReferenceField source="patientId" reference="patients" link="show" label="User IC/Passport">
                <TextField source="id"/>
            </ReferenceField>
            <ReferenceField source="patientId" reference="patients" link="show" label="User Name">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField source="patientId" reference="patients" link="show" label="User Phone Number">
                <TextField source="phoneNumber"/>
            </ReferenceField>
            <ReferenceField source="consultantId" reference="consultants" link="show" label="Consultant Name">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField source="consultantId" reference="consultants" link="show" label="Consultant Phone Number">
                <TextField source="phoneNumber"/>
            </ReferenceField>
            <SelectField source="status" choices={MEETING_STATUS}/>
            <TextField source="time"/>
        </Datagrid>
    </List>
);

export const MeetingCreate = props => (
    <Create undoable={false} {...props} successMessage={STRING.MEETING_CREATED}>
        <SimpleForm>
            <ReferenceInput label="User" source="patientId" reference="patients">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <ReferenceInput label="Consultant" source="consultantId" reference="consultants">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <SelectInput source="time" choices={timeInput} initialValue={'2020-08-10 2.00 pm - 4.00 pm'}/>
            <SelectInput source="status" choices={MEETING_STATUS} initialValue={'1'}/>
        </SimpleForm>
    </Create>
);

export const MeetingEdit = props => (
    <Edit undoable={false} {...props} successMessage={STRING.MEETING_UPDATED}>
        <SimpleForm>
            <ReferenceInput label="User" source="patientId" reference="patients">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <ReferenceInput label="Consultant" source="consultantId" reference="consultants">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="time" disabled/>
            <SelectInput source="status" choices={MEETING_STATUS} initialValue={'1'}/>
        </SimpleForm>
    </Edit>
);
