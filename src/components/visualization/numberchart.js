import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AnimatedNumber from "animated-number-react";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});


class NumberChart extends Component {

    render() {
        const {classes, data, plotProps} = this.props;

        return (
            <Paper className={classes.paper} style={{overflow: 'hidden'}} elevation={3}>
                <span style={{
                    fontSize: plotProps.titleFontSize,
                    fontWeight: plotProps.titleFontWeight
                }}>{this.props.title}</span>
                <Grid container spacing={3} justify="center" alignItems="center" style={plotProps}>
                    <Grid item xs={12}>
                        <AnimatedNumber value={data.value} formatValue={value => value.toFixed(0)}/>
                        {data.secondValue ? <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span> : null}
                        {data.secondValue ?
                            <AnimatedNumber value={data.secondValue} formatValue={value => value.toFixed(0)}/> : null}
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(NumberChart);
