import React, {Component} from 'react';
import {DiscreteColorLegend, RadialChart} from 'react-vis';
import {makeWidthFlexible} from 'react-vis';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

class PieChart extends Component {

    state = {value: null};

    rememberValue = (value) => {
        this.setState({value});
    };

    forgetValue = (value) => {
        this.setState({value: null})
    };

    render() {
        const {classes, data, plotProps} = this.props;

        const FlexibleRadialChart = makeWidthFlexible(RadialChart);
        const FlexibleLegend = makeWidthFlexible(DiscreteColorLegend);

        return (
            <Paper className={classes.paper} style={{overflow: 'hidden'}} elevation={3}>
                <span style={{fontSize: plotProps.titleFontSize}}>{this.props.title}</span>
                <Grid container spacing={3} justify="center" alignItems="center">
                    <Grid item xs={9}>
                        <FlexibleRadialChart
                            data={data}
                            colorType="literal"
                            showLabels
                            labelsRadiusMultiplier={0.7}
                            labelsStyle={{fontSize: 14}}
                            {...plotProps}
                            onValueMouseOver={(data, event) => this.setState({value: data.value})}
                            onValueMouseOut={(data, event) => this.setState({value: null})}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FlexibleLegend
                            items={data.map(d => ({title: d.label, color: d.color, strokeWidth: 10}))}
                        />
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(PieChart);
