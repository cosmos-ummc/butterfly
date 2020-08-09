import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey'
import yellow from '@material-ui/core/colors/yellow'

export const rowStyle = () => (record, index, defaultStyle = {}) => {
    let style = defaultStyle;

    if (record.status === "8") //passedaway
        return {
            ...style,
            borderLeftColor: grey[600],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
            backgroundColor: grey[300],
        };

    if (record.status === "7") //quit
        return {
            ...style,
            borderLeftColor: grey[600],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
            backgroundColor: grey[300],
        };
    if (record.status === "6") //recovered
        return {
            ...style,
            borderLeftColor: green[600],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
            backgroundColor: green[300],
        };
    if (record.status === "5") //completed
        return {
            ...style,
            borderLeftColor: green[600],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
            backgroundColor: green[300],
        };
    if (record.status === "4") //confirmed and admitted
        return {
            ...style,
            borderLeftColor: red[600],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
            backgroundColor: red[300],
        };
    if (record.status === "3") //confirmed but not admitted
        return {
            ...style,
            borderLeftColor: red[600],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
            backgroundColor: red[300],
        };
    if (record.status === "2") //asymptomatic
        return {
            ...style,
            borderLeftColor: yellow[600],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
            backgroundColor: yellow[300],
        };
    if (record.status === "1") //symptomatic
        return {
            ...style,
            borderLeftColor: orange[600],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
            backgroundColor: orange[300],
        };
    return style;
};
