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
    BooleanField,
    NumberField, useNotify,
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
import {apiUrl, httpClient} from "../data_provider/dataProvider";
import Button from "@material-ui/core/Button";
import CustomBarChart from "./visualization/custom-bar-chart";
import Grid from "@material-ui/core/Grid";
import {SimpleArrayTextField} from "./common/SimpleArrayTextField";

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

const PatientEventButton = props => {
    const url = apiUrl + `/client/patients/message`;
    const notify = useNotify();

    const patientEvent = () => {
        httpClient(url, {
            method: "POST",
            body: JSON.stringify(
                {
                    id: props.id,
                },
            ),
        })
            .then(response => ({
                status: response.status,
                headers: response.headers,
                id: response.json.id
            }))
            .then((data) => {
                if (!data.ok) {
                    notify("Telegram ID not found. Please ensure that you have linked the phone number to the Telegram Bot.");
                } else {
                    notify("Telegram Bot day 7 reminder has been sent to the selected user.");
                }
            })
            .catch(err => {
                notify("Failed to send reminder due to server error.", "warning");
            });
    };
    return (
        <div>
            <Button variant='contained' style={{background: 'orange', marginBottom: 20}} onClick={patientEvent}>Trigger
                User
                Follow Up Reminder Event</Button>
        </div>
    )
};

const ForcePatientCompleteButton = props => {
    const url = apiUrl + `/client/patients/complete`;
    const notify = useNotify();

    const verifyPatientComplete = () => {
        httpClient(url, {
            method: "POST",
            body: JSON.stringify(
                {
                    id: props.id,
                    force: true,
                },
            ),
        })
            .then(response => ({
                status: response.status,
                headers: response.headers,
                id: response.json.id
            }))
            .then((data) => {
                notify("User has completed monitoring, reminder has been sent to the user via Telegram Bot.");
            })
            .catch(err => {
                notify("Failed to check due to server error.", "warning");
            });
    };
    return (
        <div>
            <Button variant='contained' style={{background: 'orange'}} onClick={verifyPatientComplete}>Trigger Patient
                Complete Monitoring Event</Button>
        </div>
    )
};

const VerifyPatientCompleteButton = props => {
    const url = apiUrl + `/client/patients/complete`;
    const notify = useNotify();

    const verifyPatientComplete = () => {
        httpClient(url, {
            method: "POST",
            body: JSON.stringify(
                {
                    id: props.id,
                    force: false,
                },
            ),
        })
            .then(response => ({
                status: response.status,
                headers: response.headers,
                id: response.json.id
            }))
            .then((data) => {
                if (data.hasCompleted) {
                    notify("User has completed monitoring, reminder has been sent to the user via Telegram Bot.");
                } else {
                    notify("User has not completed monitoring, user needs to achieve the following criteria: days since monitoring > 14, PUI / PUS and swab result negative.");
                }
            })
            .catch(err => {
                notify("Failed to check due to server error.", "warning");
            });
    };
    return (
        <div>
            <Button variant='contained' style={{background: 'orange', marginBottom: 20}}
                    onClick={verifyPatientComplete}>Evaluate if User
                has Completed Monitoring</Button>
        </div>
    )
};

const CustomToolbar = (props) => (
    <Toolbar {...props} classes={useStyles()}>
        <SaveButton/>
    </Toolbar>
);

const PatientExtentList = (props) => (
    <Show {...props} title={" "}>
        <SimpleShowLayout>
            <TextField source="homeAddress" multiline/>
            <TextField source="isolationAddress" multiline/>
            <MyDateField source="lastDassTime" showTime label="Last DASS Time"/>
            <SelectField source="depressionStatus" choices={DECLARATION_STATUS}/>
            <SelectField source="anxietyStatus" choices={DECLARATION_STATUS}/>
            <SelectField source="stressStatus" choices={DECLARATION_STATUS}/>
            <MyDateField source="lastIesrTime" showTime label="Last IES-R Time"/>
            <SelectField source="ptsdStatus" choices={DECLARATION_STATUS} label={"PTSD Status"}/>
            <SelectField source="dailyStatus" choices={DECLARATION_STATUS} label={"Daily Report Status"}/>
            <BooleanField source="hasCompleted" label={"Has Completed Monitoring?"}/>
            <SelectField source="mentalStatus" choices={PATIENT_MENTAL_STATUS}/>
            <MyDateOnlyField source="swabDate" label="Swab Date"/>
            <SelectField source="swabResult" choices={PATIENT_SWAB_RESULT}/>
            <RichTextField source="remarks" multiline/>
            <SimpleArrayTextField source="personality">
                <TextField source="id"/>
            </SimpleArrayTextField>
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
                <SelectField source="depressionStatus" choices={DECLARATION_STATUS}/>
                <SelectField source="anxietyStatus" choices={DECLARATION_STATUS}/>
                <SelectField source="stressStatus" choices={DECLARATION_STATUS}/>
                <SelectField source="ptsdStatus" choices={DECLARATION_STATUS} label={"PTSD Status"}/>
                <SelectField source="dailyStatus" choices={DECLARATION_STATUS} label={"Daily Report Status"}/>
                <TextField source="daySinceMonitoring"/>
                <BooleanField source="hasCompleted"/>
            </Datagrid>
        </List>
    );
};

export const PatientCreate = (props) => {
    return (
        <Create undoable={false} {...props} successMessage={STRING.PATIENT_CREATED} title={"User"}>
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
                <TextInput type={"password"} source="password"/>
            </SimpleForm>
        </Create>
    );
};

export class PatientShow extends React.Component {

    state = {
        chartStressSeries: [],
        chartDepressionSeries: [],
        chartAnxietySeries: [],
        chartPtsdSeries: [],
        chartDailySeries: [],
        chartStressStatuses: [],
        chartDepressionStatuses: [],
        chartAnxietyStatuses: [],
        chartPtsdStatuses: [],
        chartDailyStatuses: [],
        chartDassCategories: [],
        chartIesrCategories: [],
        chartDailyCategories: [],
    };

    componentDidMount() {
        httpClient(`${apiUrl}/reports/${this.props.id}`)
            .then((response) => ({
                status: response.status,
                headers: response.headers,
                data: response.json.data,
            }))
            .then(({status, data}) => {
                if (status < 200 || status >= 300) {
                    console.log(status + data);
                } else {
                    // set stress series
                    this.setState({chartStressSeries: data.stressCounts});
                    // set depression series
                    this.setState({chartDepressionSeries: data.depressionCounts});
                    // set anxiety series
                    this.setState({chartAnxietySeries: data.anxietyCounts});
                    // set ptsd series
                    this.setState({chartPtsdSeries: data.ptsdCounts});
                    // set daily series
                    this.setState({chartDailySeries: data.dailyCounts});
                    // set categories
                    const dassCategories = [];
                    const iesrCategories = [];
                    const dailyCategories = [];
                    data.stressCounts.forEach((data, i) => {
                        dassCategories.push("Test " + (i + 1));
                    });
                    data.ptsdCounts.forEach((data, i) => {
                        iesrCategories.push("Test " + (i + 1));
                    });
                    data.dailyCounts.forEach((data, i) => {
                        dailyCategories.push("Test " + (i + 1));
                    });
                    this.setState({chartDassCategories: dassCategories});
                    this.setState({chartIesrCategories: iesrCategories});
                    this.setState({chartDailyCategories: dailyCategories});
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <Show {...this.props} actions="" title={"User"}>
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
                                <PatientEventButton id={this.props.id}/>
                                <VerifyPatientCompleteButton id={this.props.id}/>
                                <ForcePatientCompleteButton id={this.props.id}/>
                            </SimpleForm>
                        </Edit>
                    </Tab>
                    <Tab label="Test Reports" path="declarations">
                        <ReferenceManyField
                            reference="normaldeclarations"
                            target="patientId"
                            addLabel={false}
                            sort={{field: "submittedAt", order: "DESC"}}
                            link="show"
                        >
                            <List bulkActionButtons={false} filter={{patientId: this.props.id}}
                                  sort={{field: "submittedAt", order: "DESC"}} title={" "}>
                                <Datagrid>
                                    <MyDateField source="submittedAt" showTime label="Submitted At"/>
                                    <SelectField source="category" choices={DECLARATION_CATEGORY}/>
                                    <NumberField source="depression" label={"Depression Score"}/>
                                    <NumberField source="anxiety" label={"Anxiety Score"}/>
                                    <NumberField source="stress" label={"Stress Score"}/>
                                    <TextField source="score"/>
                                    <SelectField source="depressionStatus" choices={DECLARATION_STATUS}/>
                                    <SelectField source="anxietyStatus" choices={DECLARATION_STATUS}/>
                                    <SelectField source="stressStatus" choices={DECLARATION_STATUS}/>
                                    <SelectField source="ptsdStatus" choices={DECLARATION_STATUS}
                                                 label={"PTSD Status"}/>
                                </Datagrid>
                            </List>
                        </ReferenceManyField>
                    </Tab>
                    <Tab label="Test Results" path="results">
                        <Grid container>
                            <CustomBarChart title={"DASS Stress Report"} propData={this.state.chartStressSeries}
                                            propOption={{
                                                chart: {
                                                    id: "basic-bar"
                                                },
                                                xaxis: {
                                                    categories: this.state.chartDassCategories,
                                                }
                                            }} description={"Scores"}/>
                        </Grid>
                        <Grid container>
                            <CustomBarChart title={"DASS Anxiety Report"} propData={this.state.chartAnxietySeries}
                                            propOption={{
                                                chart: {
                                                    id: "basic-bar"
                                                },
                                                xaxis: {
                                                    categories: this.state.chartDassCategories,
                                                }
                                            }} description={"Scores"}/>
                        </Grid>
                        <Grid container>
                            <CustomBarChart title={"DASS Depression Report"} propData={this.state.chartDepressionSeries}
                                            propOption={{
                                                chart: {
                                                    id: "basic-bar"
                                                },
                                                xaxis: {
                                                    categories: this.state.chartDassCategories,
                                                }
                                            }} description={"Scores"}/>
                        </Grid>
                        <Grid container>
                            <CustomBarChart title={"IES-R Report"} propData={this.state.chartPtsdSeries}
                                            propOption={{
                                                chart: {
                                                    id: "basic-bar"
                                                },
                                                xaxis: {
                                                    categories: this.state.chartIesrCategories,
                                                }
                                            }} description={"Scores"}/>
                        </Grid>
                    </Tab>
                    <Tab label="Daily Care Reports" path="dailyquestions">
                        <ReferenceManyField
                            reference="dailydeclarations"
                            target="patientId"
                            addLabel={false}
                            sort={{field: "submittedAt", order: "DESC"}}
                            link="show"
                        >
                            <List bulkActionButtons={false} filter={{patientId: this.props.id}}
                                  sort={{field: "submittedAt", order: "DESC"}} title={" "}>
                                <Datagrid>
                                    <MyDateField source="submittedAt" showTime label="Submitted At"/>
                                    <SelectField source="category" choices={DECLARATION_CATEGORY}/>
                                    <TextField source="score"/>
                                    <SelectField source="dailyStatus" choices={DECLARATION_STATUS} label={"Daily Report Status"}/>
                                </Datagrid>
                            </List>
                        </ReferenceManyField>
                    </Tab>
                    <Tab label="Daily Care Results" path="dailyquestionsresults">
                        <Grid container>
                            <CustomBarChart title={"Daily Care Results"} propData={this.state.chartDailySeries}
                                            propOption={{
                                                chart: {
                                                    id: "basic-bar"
                                                },
                                                xaxis: {
                                                    categories: this.state.chartDailyCategories,
                                                }
                                            }} description={"Scores"}/>
                        </Grid>
                    </Tab>
                    <Tab label="Meetings" path="meetings">
                        <ReferenceManyField
                            reference="meetings"
                            target="patientId"
                            addLabel={false}
                            sort={{field: "time", order: "DESC"}}
                        >
                            <List bulkActionButtons={false} filter={{patientId: this.props.id}}
                                  sort={{field: "time", order: "DESC"}} title={" "}>
                                <Datagrid>
                                    <TextField source="consultantName" label={"Consultant Name"}/>
                                    <TextField source="consultantPhoneNumber" label={"Consultant Phone Number"}/>
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
