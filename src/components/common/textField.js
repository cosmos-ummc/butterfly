import {TextField} from "react-admin";
import React from "react";


export const RemarkTextField = props => {
    const recordRemarks = {
        ...props.record,
        [props.source]: props.record[props.source].length > 50 ? props.record[props.source].slice(0, 50) + "..." : props.record[props.source]
    };
    return <TextField {...props} record={recordRemarks} addLabel label="Patient Remarks"/>
};
