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
    ReferenceInput,
    NumberInput,
    Tab,
    Show,
    TabbedShowLayout,
} from "react-admin";
import {messagePopupStrings as STRING} from "./common/strings";
import {ClientResultTab} from "./clientresults";
import {MyDateField} from "./common/dateField";

export const ResultList = props => (
    <List
        filters={<ResultFilter/>}
        {...props}>
        <Datagrid rowClick='show'>
            <TextField source="userName"/>
            <TextField source="caseSummary"/>
            <TextField source="scores"/>
            <TextField source="remarks"/>
        </Datagrid>
    </List>
);

export const ResultCreate = props => (
    <Create undoable={false} {...props} successMessage={STRING.RESULT_CREATED}>
        <SimpleForm>
            <ReferenceInput label="User Name" source="userId" reference="users">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="userMatricNumber"/>
            <ReferenceInput label="Case" source="caseId" reference="kases">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <NumberInput source="scores"/>
            <TextInput source="management.short" multiline fullWidth label="Short Term Management"/>
            <TextInput source="management.medium" multiline fullWidth label="Medium Term Management"/>
            <TextInput source="management.long" multiline fullWidth label="Long Term Management"/>
            <TextInput source="diagnosis" multiline fullWidth/>
        </SimpleForm>
    </Create>
);

export class ResultShow extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.id);
    }

    render() {
        return (
            <Show {...this.props} actions="">
                <TabbedShowLayout>
                    <Tab label="Result">
                        <Edit undoable={false} {...this.props} successMessage={STRING.RESULT_UPDATED}>
                            <SimpleForm>
                                <MyDateField source="startTime" showTime label="Start Time"/>
                                <MyDateField source="endTime" showTime label="End Time"/>
                                <TextInput source="userName" disabled/>
                                <TextInput source="userMatricNumber" disabled/>
                                <TextInput source="caseSummary" disabled fullWidth/>
                                <TextInput source="management.short" disabled multiline fullWidth
                                           label="Short Term Management"/>
                                <TextInput source="management.medium" disabled multiline fullWidth
                                           label="Medium Term Management"/>
                                <TextInput source="management.long" disabled multiline fullWidth
                                           label="Long Term Management"/>
                                <TextInput source="diagnosis" disabled multiline fullWidth/>
                                <NumberInput source="scores"/>
                                <TextInput source="remarks"/>
                            </SimpleForm>
                        </Edit>
                    </Tab>
                    <Tab label="Summary">
                        <ClientResultTab clientId={this.props.id}/>
                    </Tab>
                </TabbedShowLayout>
            </Show>
        )
    }
}

const ResultFilter = props => (
    <Filter {...props}>
        <TextInput
            label="Search"
            source="q"
            alwaysOn
        />
    </Filter>
);
