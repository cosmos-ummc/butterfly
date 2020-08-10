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
} from "react-admin";
import RichTextInput from 'ra-input-rich-text';
import {makeStyles} from "@material-ui/core/styles";
import {MyDateField} from "./common/dateField";
import {
    DECLARATION_STATUS, DECLARATION_CATEGORY,
} from "./declarations";
import {rowStyle} from "./common/rowStyle";
import {messagePopupStrings as STRING} from "./common/strings";
import {CustomFilter} from "./filter";

export const PATIENT_TYPE = [
    {id: "1", name: "PUI"},
    {id: "2", name: "PUS"},
    {id: "3", name: "HCW"},
    {id: "4", name: "Patient"},
    {id: "5", name: "Others"},
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
            <SelectField source="lastDassResult" choices={DECLARATION_STATUS} label="Last DASS Result"/>
            <MyDateField source="lastIesrTime" showTime label="Last IES-R Time"/>
            <SelectField source="lastIesrResult" choices={DECLARATION_STATUS} label="Last IES-R Result"/>
            <TextField source="remarks" multiline/>
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
                        >
                            <List bulkActionButtons={false} filter={{patientId: this.props.id}}
                                  sort={{field: "submittedAt", order: "DESC"}}>
                                <Datagrid>
                                    <MyDateField source="submittedAt" showTime/>
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
                </TabbedShowLayout>
            </Show>
        );
    }
}
