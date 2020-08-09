import React from "react";
import {useInput, FieldTitle} from "ra-core";
import {makeStyles} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row"
    },
    datepicker: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "7px 0 25px 0",
        padding: "7px",
        background: "#F5F5F5",
        borderRadius: "5px 5px"
    }
});

const DatePicker = props => {
    const classes = useStyles();

    const {
        label,
        source,
        resource,
        className,
        isRequired,
        enableinitialvalue
    } = props;

    const {input} = useInput({source});


    const dateParser = date => {
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, 0);
        var day = String(date.getDate()).padStart(2, 0);
        return `${year}${month}${day}`;
    };

    const dateValueHandle = dateInt => {
        if (dateInt) {
            var year = dateInt.substring(0, 4);
            var month = dateInt.substring(4, 6);
            var day = dateInt.substring(6, 8);
            return new Date(`${year}-${month}-${day}`);
        } else if (enableinitialvalue) {
            var today = new Date();
            input.onChange(dateParser(today));
            return today;
        } else {
            return null;
        }
    };

    const handleChange = value => {
        Date.parse(value)
            ? input.onChange(dateParser(value))
            : input.onChange(null);
    };

    return (
        <div className={classes.root}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    label={
                        <FieldTitle
                            title={label}
                            source={source}
                            resource={resource}
                            isRequired={isRequired}
                        />
                    }
                    {...props}
                    disableToolbar
                    variant="inline"
                    margin="normal"
                    format="dd-MM-yyyy"
                    className={className}
                    value={dateValueHandle(input.value)}
                    onChange={date => handleChange(date)}
                />
            </MuiPickersUtilsProvider>
        </div>
    );
};

export default DatePicker;
