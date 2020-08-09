import React, {Component} from "react";
import {
    XAxis,
    YAxis,
    HorizontalBarSeries,
    VerticalBarSeries,
    Hint,
} from "react-vis";
import {FlexibleWidthXYPlot} from "react-vis";
import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
});

const axisStyle = {
    line: {stroke: "#ADDDE1"},
    ticks: {stroke: "#ADDDE1"},
    text: {stroke: "none", fill: "#6b6b76", fontWeight: 600},
    fontSize: 11,
};

class BarChart extends Component {
    state = {hintValue: null};

    render() {
        const {hintValue} = this.state;
        const {
            classes,
            data,
            isVertical,
            maxValue,
            yaxis,
            plotProps,
        } = this.props;
        const BarSeries = isVertical ? VerticalBarSeries : HorizontalBarSeries;

        const xyplotProps = isVertical
            ? {
                xType: "ordinal",
                yDomain: maxValue
                    ? [0, maxValue]
                    : [0, Math.max(...data.map((d) => d.y)) + 2],
                ...plotProps,
            }
            : {
                yType: "ordinal",
                xDomain: maxValue
                    ? [0, maxValue]
                    : [0, Math.max(...data.map((d) => d.x)) + 2],
                ...plotProps,
            };

        return (
            <Paper
                className={classes.paper}
                style={{overflow: "hidden"}}
                elevation={3}
            >
        <span style={{fontSize: plotProps.titleFontSize}}>
          {this.props.title}
        </span>
                <FlexibleWidthXYPlot {...xyplotProps} margin={{bottom: 120}}>
                    <XAxis style={axisStyle} position="end" tickLabelAngle={-45}/>
                    <YAxis title={yaxis ? yaxis : "Frequency"} style={axisStyle}/>
                    <BarSeries
                        data={data}
                        barWidth={this.props.barWidth}
                        onValueMouseOver={(hintValue) => this.setState({hintValue})}
                        onValueMouseOut={(hintValue) => this.setState({hintValue: null})}
                    />
                    {hintValue ? <Hint value={hintValue}/> : null}
                </FlexibleWidthXYPlot>
            </Paper>
        );
    }
}

export default withStyles(styles)(BarChart);
