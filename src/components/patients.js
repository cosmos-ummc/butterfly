import React from "react";
import {
    List,
    Edit,
    Create,
    Datagrid,
    TextField,
    SelectField,
    SimpleForm,
    TextInput,
    SelectInput,
    Toolbar,
    SaveButton,
    ReferenceManyField,
    Show,
    TabbedShowLayout,
    Tab,
    SimpleShowLayout,
    RichTextField,
    NumberInput,
    BooleanInput,
    BooleanField, ReferenceField,
    NumberField,
} from "react-admin";
import RichTextInput from 'ra-input-rich-text';
import {makeStyles} from "@material-ui/core/styles";
import {MyDateField, MyDateOnlyField} from "./common/dateField";
import {
    DECLARATION_STATUS, DECLARATION_CATEGORY,
} from "./declarations";
import {rowStyle} from "./common/rowStyle";
import {messagePopupStrings as STRING} from "./common/strings";
import {CustomFilter} from "./filter";
import DatePicker from "./common/datePicker";
import {MEETING_STATUS} from "./meetings";

export const PATIENT_TYPE = [
    {id: "1", name: "PUI"},
    {id: "2", name: "PUS"},
    {id: "3", name: "HCW"},
    {id: "4", name: "Patient"},
    {id: "5", name: "Others"},
];

export const PATIENT_MENTAL_STATUS = [
    {id: "0", name: "Not Categorized"},
    {id: "1", name: "Depression"},
    {id: "2", name: "Anxiety"},
    {id: "3", name: "Stress"},
    {id: "4", name: "PTSD"},
];

export const PATIENT_SWAB_RESULT = [
    {id: "0", name: "None"},
    {id: "1", name: "Pending"},
    {id: "2", name: "Positive"},
    {id: "3", name: "Negative"},
];

const useStyles = makeStyles({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
});

const CustomToolbar = (props) => (
    <Toolbar {...props} classes={useStyles()}>
        <SaveButton/>
    </Toolbar>
);

const PatientExtentList = (props, resource, basePath) => (
    // TODO: Add swab date and result
    <Show {...props} title={" "}>
        <SimpleShowLayout>
            <TextField source="homeAddress" multiline/>
            <TextField source="isolationAddress" multiline/>
            <MyDateField source="lastDassTime" showTime label="Last DASS Time"/>
            <NumberField source="lastDassResult" label="Last DASS Result"/>
            <MyDateField source="lastIesrTime" showTime label="Last IES-R Time"/>
            <NumberField source="lastIesrResult" label="Last IES-R Result"/>
            <BooleanField source="hasCompleted"/>
            <SelectField source="mentalStatus" choices={PATIENT_MENTAL_STATUS}/>
            <MyDateOnlyField source="swabDate" label="Swab Date"/>
            <SelectField source="swabResult" choices={PATIENT_SWAB_RESULT}/>
            <RichTextField source="remarks" multiline/>
        </SimpleShowLayout>
    </Show>
);

export const PatientList = ({permissions, ...props}) => {
    return (
        <List
            filters={<CustomFilter/>}
            {...props}
            title={"Users"}
        >
            <Datagrid
                rowClick="show"
                rowStyle={rowStyle()}
                expand={<PatientExtentList/>}
            >
                <TextField source="id" label="NRIC/Passport"/>
                <TextField source="name"/>
                <TextField source="phoneNumber"/>
                <TextField source="email"/>
                <SelectField source="type" choices={PATIENT_TYPE}/>
                <SelectField source="status" choices={DECLARATION_STATUS}/>
                <TextField source="daySinceMonitoring"/>
                <BooleanField source="hasCompleted"/>
            </Datagrid>
        </List>
    );
};

export const PatientCreate = (props) => {
    return (
        <Create undoable={false} {...props} successMessage={STRING.PATIENT_CREATED} title={"Users"}>
            <SimpleForm>
                <TextInput source="id" label="NRIC/Passport"/>
                <TextInput source="name"/>
                <TextInput source="phoneNumber"/>
                <TextInput source="email"/>
                <SelectInput source="type" choices={PATIENT_TYPE} initialValue='1'/>
                <TextInput source="homeAddress"/>
                <TextInput source="isolationAddress"/>
                <DatePicker source="swabDate" enableinitialvalue="true"/>
                <SelectInput source="swabResult" choices={PATIENT_SWAB_RESULT} initialValue='0'/>
            </SimpleForm>
        </Create>
    );
};

export class PatientShow extends React.Component {
    render() {
        return (
            <Show {...this.props} actions="" title={"User #" + this.props.id}>
                <TabbedShowLayout>
                    <Tab label="Details">
                        <Edit
                            undoable={false}
                            {...this.props}
                            actions=""
                            title={" "}
                            successMessage={STRING.PATIENT_UPDATED}
                        >
                            <SimpleForm
                                toolbar={<CustomToolbar/>}
                                redirect="show"
                            >
                                <TextInput source="id" label="NRIC/Passport" disabled/>
                                <TextInput source="name"/>
                                <TextInput source="phoneNumber"/>
                                <TextInput source="email"/>
                                <SelectInput source="type" choices={PATIENT_TYPE} initialValue='1'/>
                                <TextInput source="homeAddress"/>
                                <TextInput source="isolationAddress"/>
                                <NumberInput source="daySinceMonitoring"/>
                                <BooleanInput source="hasCompleted"/>
                                <SelectInput source="mentalStatus" choices={PATIENT_MENTAL_STATUS} initialValue='0'/>
                                <DatePicker source="swabDate" enableinitialvalue="true"/>
                                <SelectInput source="swabResult" choices={PATIENT_SWAB_RESULT} initialValue='0'/>
                                <RichTextInput source="remarks"/>
                            </SimpleForm>
                        </Edit>
                    </Tab>
                    <Tab label="Reports" path="declarations">
                        <ReferenceManyField
                            reference="declarations"
                            target="patientId"
                            addLabel={false}
                            sort={{field: "submittedAt", order: "DESC"}}
                            link="show"
                        >
                            <List bulkActionButtons={false} filter={{patientId: this.props.id}}
                                  sort={{field: "submittedAt", order: "DESC"}}>
                                <Datagrid>
                                    <MyDateField source="submittedAt" showTime label="Submitted At"/>
                                    <SelectField source="category" choices={DECLARATION_CATEGORY}/>
                                    <TextField source="score"/>
                                    <SelectField source="status" choices={DECLARATION_STATUS}/>
                                    <TextField
                                        source="doctorRemarks"
                                        multiline
                                        label="Doctor's Note"
                                    />
                                </Datagrid>
                            </List>
                        </ReferenceManyField>
                    </Tab>
                    <Tab label="Meetings" path="meetings">
                        <ReferenceManyField
                            reference="meetings"
                            target="patientId"
                            addLabel={false}
                            sort={{field: "time", order: "DESC"}}
                        >
                            <List bulkActionButtons={false} filter={{patientId: this.props.id}}
                                  sort={{field: "time", order: "DESC"}}>
                                <Datagrid>
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
                        </ReferenceManyField>
                    </Tab>
                </TabbedShowLayout>
            </Show>
        );
    }
}
