import {DateField, TextField} from "react-admin";
import React from "react";

// fix timestamp
// https://stackoverflow.com/questions/54916324/can-i-use-datefield-with-timestamp-value-in-react-admin

export const MyDateField = props => {
    const date = parseInt(props.record[props.source], 10);
    const newRecord = {
        ...props.record,
        [props.source]: date,
    };

    if (newRecord.lastDeclared === 0) {
        return <div>No time available</div>
    }
    return (
        <span>
            <TextField emptyText={props.label + (!!props.label ? ": " : "")}/>
            <DateField {...props} record={newRecord} locales='en-GB'/>
            <TodayIconField date={date} dateFormat='DATE_AND_TIME'/>
        </span>
    );
};

export const MyDateOnlyField = props => {
    const v = props.record[props.source];
    if (v === "") {
        return <TextField emptyText="--"/>;
    }
    try {
        const date = new Date(
            parseInt(v.substring(0, 4)),
            parseInt(v.substring(4, 6)) - 1, // month is 0-based in JS
            parseInt(v.substring(6, 8)),
        );
        const record = {
            ...props.record,
            [props.source]: date.toISOString()
        };
        return (
            <span>
                <DateField {...props} record={record} locales='en-GB'/>
                <TodayIconField date={date} dateFormat='DATE_ONLY'/>
            </span>
        );
    } catch (err) {
        return <TextField emptyText={"-Invalid Date-" + v}/>;
    }

};

MyDateOnlyField.defaultProps = {
    addLabel: true,
};

const todayIconStyle = {
    color: 'red',
    fontSize: '0.7em',
    marginLeft: '5px',
};

const TodayIconField = ({date, dateFormat}) => {

    if (dateFormat === 'DATE_ONLY') {
        if (date === "") {
            return null;
        }
        try {
            if (isToday(date)) {
                return <span style={todayIconStyle}>TODAY</span>;
            } else {
                return null;
            }
        } catch (err) {
            return <span>~e~</span>;
        }
    } else if (dateFormat === 'DATE_AND_TIME') {
        if (isToday(new Date(date))) {
            return <span style={todayIconStyle}>TODAY</span>;
        } else {
            return null;
        }
    } else {
        return <span>~</span>;
    }
};


const isToday = (someDate) => {
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear();
};
