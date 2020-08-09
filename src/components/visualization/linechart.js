import React, {Component} from 'react';
import {makeWidthFlexible} from 'react-vis';
import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    LineMarkSeries,
    Hint,
    DiscreteColorLegend
} from 'react-vis';
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

const axisStyle = {
    line: {stroke: '#ADDDE1'},
    ticks: {stroke: '#ADDDE1'},
    text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600},
    fontSize: 14
};

class LineChart extends Component {
    state = {hintValue: null};

    render() {
        const {hintValue} = this.state;

        const {classes, data, plotProps, isVertical, maxValue, xaxis, yaxis} = this.props;
        const Line = LineMarkSeries;
        const FlexibleLegend = makeWidthFlexible(DiscreteColorLegend);

        const xyplotProps = isVertical ? {
            xType: 'ordinal',
            yDomain: maxValue,
            ...plotProps
        } : {
            yType: 'ordinal',
            xDomain: maxValue,
            ...plotProps
        };

        return (
            <Paper className={classes.paper} style={{overflow: 'hidden'}} elevation={3}>
                <span style={{fontSize: plotProps.titleFontSize}}>{this.props.title}</span>
                <Grid container spacing={3} justify="center" alignItems="center">
                    <Grid item xs={9}>
                        <FlexibleWidthXYPlot {...xyplotProps}>
                            <HorizontalGridLines/>
                            <VerticalGridLines/>
                            <XAxis tickLabelAngle={-45} style={axisStyle} title={xaxis}/>
                            <YAxis style={axisStyle} title={yaxis}/>
                            {data.map((d, i) => <Line
                                key={`line-${i}`}
                                data={d.data}
                                color={d.color}
                                onValueMouseOver={hintValue => this.setState({hintValue: {label: d.label, ...hintValue}})}
                                onValueMouseOut={hintValue => this.setState({hintValue: null})}/>)}
                            {hintValue ? <Hint value={hintValue}/> : null}
                        </FlexibleWidthXYPlot>
                    </Grid>
                    <Grid item xs={3}>
                        <FlexibleLegend items={data.map(d => ({title: d.label, color: d.color, strokeWidth: 10}))}
                        />
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(LineChart);
