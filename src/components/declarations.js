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
    ArrayField,
    NumberField,
    NumberInput,
} from "react-admin";
import {messagePopupStrings as STRING} from "./common/strings";
import {CustomFilter} from "./filter";
import {MyDateField} from "./common/dateField";

export const DECLARATION_CATEGORY = [
    {id: "dass", name: 'DASS'},
    {id: "iesr", name: 'IES-R'},
    {id: "daily", name: 'Daily Report'},
];

export const DECLARATION_STATUS = [
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
            <TextField source="patientId" label={"User NRIC/Passport"}/>
            <TextField source="patientName" label={"User Name"}/>
            <TextField source="patientPhoneNumber" label={"User Phone Number"}/>
            <SelectField source="category" choices={DECLARATION_CATEGORY}/>
            <NumberField source="depression" label={"Depression Score"}/>
            <NumberField source="anxiety" label={"Anxiety Score"}/>
            <NumberField source="stress" label={"Stress Score"}/>
            <NumberField source="score"/>
            <SelectField source="depressionStatus" choices={DECLARATION_STATUS}/>
            <SelectField source="anxietyStatus" choices={DECLARATION_STATUS}/>
            <SelectField source="stressStatus" choices={DECLARATION_STATUS}/>
            <SelectField source="ptsdStatus" choices={DECLARATION_STATUS} label={"PTSD Status"}/>
            <MyDateField source="submittedAt" showTime label="Submitted At"/>
        </Datagrid>
    </List>
);

export const DeclarationEdit = props => (
    <Edit undoable={false} {...props} successMessage={STRING.DECLARATION_UPDATED} title={"Report #" + props.id}>
        <SimpleForm>
            <MyDateField source="submittedAt" showTime label="Submitted At"/>
            <TextField source="patientId" label={"User NRIC/Passport"}/>
            <TextField source="patientName" label={"User Name"}/>
            <TextField source="patientPhoneNumber" label={"User Phone Number"}/>
            <ArrayField source="result" label="Results">
                <Datagrid>
                    <TextField source="content"/>
                    <TextField source="score"/>
                </Datagrid>
            </ArrayField>
            <SelectInput source="category" choices={DECLARATION_CATEGORY} disabled/>
            <NumberInput source="depression" label={"Depression Score"}/>
            <NumberInput source="anxiety" label={"Anxiety Score"}/>
            <NumberInput source="stress" label={"Stress Score"}/>
            <NumberInput source="score" disabled/>
            <SelectInput source="depressionStatus" choices={DECLARATION_STATUS} disabled/>
            <SelectInput source="anxietyStatus" choices={DECLARATION_STATUS} disabled/>
            <SelectInput source="stressStatus" choices={DECLARATION_STATUS} disabled/>
            <SelectInput source="ptsdStatus" choices={DECLARATION_STATUS} disabled/>
            <TextInput
                source="doctorRemarks"
                multiline
                label="Doctor's Note"
            />
        </SimpleForm>
    </Edit>
);
