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
    {id: "3", name: 'Rejected'},
    {id: "4", name: 'Self Notified'},
];

function MonthAsString(monthIndex) {
    const month = [];
    month.push("January");
    month.push("February");
    month.push("March");
    month.push("April");
    month.push("May");
    month.push("June");
    month.push("July");
    month.push("August");
    month.push("September");
    month.push("October");
    month.push("November");
    month.push("December");

    return month[monthIndex];
}

function DayAsString(dayIndex) {
    const weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";

    return weekdays[dayIndex];
}

// https://stackoverflow.com/questions/10032456/how-to-get-next-seven-days-from-x-and-format-in-js
function GetDates(startDate, daysToAdd) {
    const aryDates = [];
    let ctn = 0;
    for (let i = 0; i < daysToAdd + 3; i++) {  //add 3 more day to exclude weekend
        const currentDate = new Date();
        currentDate.setDate(startDate.getDate() + i);
        if (DayAsString(currentDate.getDay()) !== "Saturday" && DayAsString(currentDate.getDay()) !== "Sunday" && ctn <7 ) {
            ctn++;
            // aryDates.push(DayAsString(currentDate.getDay()) + ", " + currentDate.getDate() + " " + MonthAsString(currentDate.getMonth()) + " " + currentDate.getFullYear());
            aryDates.push(currentDate.getDate() + " " + MonthAsString(currentDate.getMonth()) + " " + currentDate.getFullYear());
        }
    }

    return aryDates;
}

// https://stackoverflow.com/questions/36125038/generate-array-of-times-as-strings-for-every-x-minutes-in-javascript
function get2hrs(){
    const x = 120; //minutes interval
    const times = []; // time array
    let tt = 0; // start time
    const ap = ['AM', 'PM']; // AM-PM

    //loop to increment the time and push results in array
    for (let i=0;tt<24*60; i++) {
        if((tt >= 8*60) && (tt <= 18*60)){
            const hh = Math.floor(tt/60); // getting hours of day in 0-24 format
            const mm = (tt%60); // getting minutes of the hour in 0-55 format
            times.push((((hh%12<10)? "0":"") + ((hh===12)?12:hh%12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]); // pushing data in array in [00:00 - 12:00 AM/PM format]
        }
        tt = tt + x;
    }
    return times
}

function generateSlots(){
    const slots = []; // time array

    const startDate = new Date();
    const arrDates = GetDates(startDate, 7);
    const arrhours = get2hrs();

    for(let i=0; i<arrDates.length; i++){
        for(let j=0; j<arrhours.length; j++){
            const slot = arrDates[i] + ", " + arrhours[j];
            slots.push({
                id: slot,
                name: slot
            });
        }
    }
    return slots
}

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
            <SelectInput source="time" choices={generateSlots()} initialValue={'2020-08-10 2.00 pm - 4.00 pm'}/>
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
