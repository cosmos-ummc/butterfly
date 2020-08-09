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
    BooleanInput,
    ArrayInput,
    SimpleFormIterator,
    ReferenceInput,
} from "react-admin";
import {messagePopupStrings as STRING} from "./common/strings";
import {SimpleArrayTextField} from "./common/SimpleArrayTextField";
import Divider from '@material-ui/core/Divider';

const ANSWER_TYPE = [
    {id: "text", name: 'Text'},
    {id: "image", name: 'Image'},
    {id: "video", name: 'Video'},
    {id: "audio", name: 'Audio'},
];

const MANAGEMENT_TYPE = [
    {id: "short", name: 'Short Term'},
    {id: "medium", name: 'Medium Term'},
    {id: "long", name: 'Long Term'},
];

export const CaseList = props => (
    <List
        filters={<CaseFilter/>}
        {...props}>
        <Datagrid rowClick='show'>
            <TextField source="name"/>
            <SimpleArrayTextField source="symptoms">
                <TextField source="id"/>
            </SimpleArrayTextField>
            <TextField source="summary"/>
        </Datagrid>
    </List>
);

export const CaseCreate = props => (
    <Create undoable={false} {...props} successMessage={STRING.CASE_CREATED}>
        <SimpleForm>
            <TextInput source="name"/>
            <TextInput source="category" label="Posting"/>
            <ArrayInput source="symptoms">
                <SimpleFormIterator>
                    <TextInput format={(value) => (typeof value === 'object' ? '' : value)} label=""/>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="summary" fullWidth/>
            <TextInput source="presentation" fullWidth multiline/>

            <Divider style={{marginTop: "20px", width: "100%", height: "1.5px", backgroundColor: "black"}}/>

            <ArrayInput source="history">
                <SimpleFormIterator>
                    <ReferenceInput label="History" source="id" reference="histories">
                        <SelectInput optionText="question"/>
                    </ReferenceInput>
                    <SelectInput label="Answer Type" source="answer.type" choices={ANSWER_TYPE} initialValue={'text'}/>
                    <TextInput label="Answer Content" source="answer.contents" fullWidth multiline/>
                    <BooleanInput label="Relevant Choice" source="isAnswer"/>
                    <ArrayInput source="tips" label="History Tips">
                        <SimpleFormIterator>
                            <TextInput fullWidth multiline format={(value) => (typeof value === 'object' ? '' : value)}
                                       label=""/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleFormIterator>
            </ArrayInput>

            <Divider style={{marginTop: "20px", width: "100%", height: "1.5px", backgroundColor: "black"}}/>

            <ArrayInput source="examination">
                <SimpleFormIterator>
                    <ReferenceInput label="Examination" source="id" reference="examinations">
                        <SelectInput optionText="question"/>
                    </ReferenceInput>
                    <SelectInput label="Answer Type" source="answer.type" choices={ANSWER_TYPE} initialValue={'text'}/>
                    <TextInput label="Answer Content" source="answer.contents" fullWidth multiline/>
                    <BooleanInput label="Relevant Choice" source="isAnswer"/>
                    <ArrayInput source="tips" label="Examination Tips">
                        <SimpleFormIterator>
                            <TextInput fullWidth multiline format={(value) => (typeof value === 'object' ? '' : value)}
                                       label=""/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleFormIterator>
            </ArrayInput>

            <Divider style={{marginTop: "20px", width: "100%", height: "1.5px", backgroundColor: "black"}}/>

            <ArrayInput source="investigation">
                <SimpleFormIterator>
                    <ReferenceInput label="Investigation" source="id" reference="investigations">
                        <SelectInput optionText="question"/>
                    </ReferenceInput>
                    <SelectInput label="Answer Type" source="answer.type" choices={ANSWER_TYPE} initialValue={'text'}/>
                    <TextInput label="Answer Content" source="answer.contents"/>
                    <BooleanInput label="Relevant Choice" source="isAnswer"/>
                    <ArrayInput source="tips" label="Investigation Tips">
                        <SimpleFormIterator>
                            <TextInput fullWidth multiline format={(value) => (typeof value === 'object' ? '' : value)}
                                       label="Investigation Tips"/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleFormIterator>
            </ArrayInput>

            <Divider style={{marginTop: "20px", width: "100%", height: "1.5px", backgroundColor: "black"}}/>

            <ArrayInput source="management">
                <SimpleFormIterator>
                    <SelectInput label="Management Type" source="type" choices={MANAGEMENT_TYPE}
                                 initialValue={'short'}/>
                    <SelectInput label="Answer Type" source="answer.type" choices={ANSWER_TYPE} initialValue={'text'}/>
                    <TextInput label="Answer Content" source="answer.contents"/>
                    <ArrayInput source="tips" label="Management Tips">
                        <SimpleFormIterator>
                            <TextInput fullWidth multiline format={(value) => (typeof value === 'object' ? '' : value)}
                                       label=""/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleFormIterator>
            </ArrayInput>

            <Divider style={{marginTop: "20px", width: "100%", height: "1.5px", backgroundColor: "black"}}/>

            <ArrayInput source="diagnosis">
                <SimpleFormIterator>
                    <TextInput fullWidth multiline format={(value) => (typeof value === 'object' ? '' : value)}
                               label=""/>
                </SimpleFormIterator>
            </ArrayInput>

            <Divider style={{marginTop: "20px", width: "100%", height: "1.5px", backgroundColor: "black"}}/>

            <ArrayInput source="tips">
                <SimpleFormIterator>
                    <TextInput fullWidth multiline format={(value) => (typeof value === 'object' ? '' : value)}
                               label=""/>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

export const CaseEdit = props => (
    <Edit undoable={false} {...props} successMessage={STRING.CASE_UPDATED}>
        <SimpleForm>
            <TextInput source="name"/>
            <TextInput source="category" label="Posting"/>
            <ArrayInput source="symptoms">
                <SimpleFormIterator>
                    <TextInput format={(value) => (typeof value === 'object' ? '' : value)} label=""/>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="summary" fullWidth/>
            <TextInput source="presentation" fullWidth multiline/>

            <Divider style={{marginTop: "20px", width: "100%", height: "1.5px", backgroundColor: "black"}}/>

            <ArrayInput source="history">
                <SimpleFormIterator>
                    <ReferenceInput label="History" source="id" reference="histories">
                        <SelectInput optionText="question"/>
                    </ReferenceInput>
                    <SelectInput label="Answer Type" source="answer.type" choices={ANSWER_TYPE} initialValue={'text'}/>
                    <TextInput label="Answer Content" source="answer.contents" fullWidth multiline/>
                    <BooleanInput label="Relevant Choice" source="isAnswer"/>
                    <ArrayInput source="tips" label="History Tips">
                        <SimpleFormIterator>
                            <TextInput fullWidth multiline format={(value) => (typeof value === 'object' ? '' : value)}
                                       label=""/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleFormIterator>
            </ArrayInput>

            <Divider style={{marginTop: "20px", width: "100%", height: "1.5px", backgroundColor: "black"}}/>

            <ArrayInput source="examination">
                <SimpleFormIterator>
                    <ReferenceInput label="Examination" source="id" reference="examinations">
                        <SelectInput optionText="question"/>
                    </ReferenceInput>
                    <SelectInput label="Answer Type" source="answer.type" choices={ANSWER_TYPE} initialValue={'text'}/>
                    <TextInput label="Answer Content" source="answer.contents" fullWidth multiline/>
                    <BooleanInput label="Relevant Choice" source="isAnswer"/>
                    <ArrayInput source="tips" label="Examination Tips">
                        <SimpleFormIterator>
                            <TextInput fullWidth multiline format={(value) => (typeof value === 'object' ? '' : value)}
                                       label=""/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleFormIterator>
            </ArrayInput>

            <Divider style={{marginTop: "20px", width: "100%", height: "1.5px", backgroundColor: "black"}}/>

            <ArrayInput source="investigation">
                <SimpleFormIterator>
                    <ReferenceInput label="Investigation" source="id" reference="investigations">
                        <SelectInput optionText="question"/>
                    </ReferenceInput>
                    <SelectInput label="Answer Type" source="answer.type" choices={ANSWER_TYPE} initialValue={'text'}/>
                    <TextInput label="Answer Content" source="answer.contents"/>
                    <BooleanInput label="Relevant Choice" source="isAnswer"/>
                    <ArrayInput source="tips" label="Investigation Tips">
                        <SimpleFormIterator>
                            <TextInput fullWidth multiline format={(value) => (typeof value === 'object' ? '' : value)}
                                       label="Investigation Tips"/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleFormIterator>
            </ArrayInput>

            <Divider style={{marginTop: "20px", width: "100%", height: "1.5px", backgroundColor: "black"}}/>

            <ArrayInput source="management">
                <SimpleFormIterator>
                    <SelectInput label="Management Type" source="type" choices={MANAGEMENT_TYPE}
                                 initialValue={'short'}/>
                    <SelectInput label="Answer Type" source="answer.type" choices={ANSWER_TYPE} initialValue={'text'}/>

                    <TextInput label="Answer Content" source="answer.contents"/>
                    <ArrayInput source="tips" label="Management Tips">
                        <SimpleFormIterator>
                            <TextInput fullWidth multiline format={(value) => (typeof value === 'object' ? '' : value)}
                                       label=""/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleFormIterator>
            </ArrayInput>

            <Divider style={{marginTop: "20px", width: "100%", height: "1.5px", backgroundColor: "black"}}/>

            <ArrayInput source="diagnosis">
                <SimpleFormIterator>
                    <TextInput fullWidth multiline format={(value) => (typeof value === 'object' ? '' : value)}
                               label=""/>
                </SimpleFormIterator>
            </ArrayInput>

            <Divider style={{marginTop: "20px", width: "100%", height: "1.5px", backgroundColor: "black"}}/>

            <ArrayInput source="tips">
                <SimpleFormIterator>
                    <TextInput fullWidth multiline format={(value) => (typeof value === 'object' ? '' : value)}
                               label=""/>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

const CaseFilter = props => (
    <Filter {...props}>
        <TextInput
            label="Search"
            source="q"
            alwaysOn
        />
    </Filter>
);
