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
    Toolbar,
    SaveButton,
    ReferenceManyField,
    Show,
    TabbedShowLayout,
    Tab,
    ArrayInput,
    SimpleFormIterator,
    Button,
} from "react-admin";
import {makeStyles} from "@material-ui/core/styles";
import {rowStyle} from "./common/rowStyle";
import {messagePopupStrings as STRING} from "./common/strings";
import {CustomFilter} from "./filter";
import {MEETING_STATUS} from "./meetings";

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

export const ConsultantList = ({permissions, ...props}) => {
    return (
        <List
            filters={<CustomFilter/>}
            {...props}
            title={"Consultants"}
        >
            <Datagrid
                rowClick="show"
                rowStyle={rowStyle()}
            >
                <TextField source="name"/>
                <TextField source="phoneNumber"/>
                <TextField source="email"/>
            </Datagrid>
        </List>
    );
};

export const ConsultantCreate = (props) => {
    return (
        <Create undoable={false} {...props} successMessage={STRING.CONSULTANT_CREATED} title={"Consultant"}>
            <SimpleForm>
                <TextInput source="name"/>
                <TextInput source="phoneNumber"/>
                <TextInput source="email"/>
                <TextInput type={"password"} source="password"/>
            </SimpleForm>
        </Create>
    );
};

export class ConsultantShow extends React.Component {
    render() {
        return (
            <Show {...this.props} actions="" title={"Consultants"}>
                <TabbedShowLayout>
                    <Tab label="Details">
                        <Edit
                            undoable={false}
                            {...this.props}
                            actions=""
                            title={" "}
                            successMessage={STRING.CONSULTANT_UPDATED}
                        >
                            <SimpleForm
                                toolbar={<CustomToolbar/>}
                                redirect="show"
                            >
                                <TextInput source="name"/>
                                <TextInput source="phoneNumber"/>
                                <TextInput source="email"/>
                                <ArrayInput source="takenSlots" label="Taken Slots">
                                    <SimpleFormIterator disableRemove disableAdd>
                                        <TextInput fullWidth multiline
                                                   format={(value) => (typeof value === 'object' ? '' : value)}
                                                   label="" disabled/>
                                    </SimpleFormIterator>
                                </ArrayInput>
                            </SimpleForm>
                        </Edit>
                    </Tab>
                    <Tab label="Meetings" path="meetings">
                        <ReferenceManyField
                            reference="meetings"
                            target="consultantId"
                            addLabel={false}
                            sort={{field: "time", order: "DESC"}}
                        >
                            <List bulkActionButtons={false} filter={{consultantId: this.props.id}}
                                  sort={{field: "time", order: "DESC"}} title={" "}>
                                <Datagrid>
                                    <TextField source="patientId" label={"User IC/Passport"}/>
                                    <TextField source="patientName" label={"User Name"}/>
                                    <TextField source="patientPhoneNumber" label={"User Phone Number"}/>
                                    <SelectField source="status" choices={MEETING_STATUS}/>
                                    <TextField source="time"/>
                                    <Button label={"Join Meeting"} href={"https://chat.quaranteams.tk"}/>
                                </Datagrid>
                            </List>
                        </ReferenceManyField>
                    </Tab>
                </TabbedShowLayout>
            </Show>
        );
    }
}
