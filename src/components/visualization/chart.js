import React, {Component} from 'react';
import BarChart from './barchart';
import PieChart from './piechart';
import LineChart from './linechart';
import NumberChart from './numberchart';

class Chart extends Component {

    render() {
        const {title, data, chartType, chartHeight, maxValue, fontWeight} = this.props;
        const {xaxis, yaxis} = this.props;
        const chartBarWidth = 0.3;

        if (chartType === 'barchart') {
            return (
                <BarChart
                    title={title}
                    data={data}
                    isVertical
                    yaxis={yaxis}
                    maxValue={maxValue}
                    plotProps={
                        {
                            height: chartHeight,
                            margin: {bottom: 80},
                            titleFontSize: 20,
                            barWidth: chartBarWidth
                        }
                    }
                >
                    {this.props.children}
                </BarChart>
            )
        } else if (chartType === 'piechart') {
            return (
                <PieChart
                    title={title}
                    data={data}
                    plotProps={
                        {
                            height: chartHeight,
                            titleFontSize: 20,
                            margin: {bottom: 5, top: 5, right: 5, left: 5}
                        }
                    }
                >
                    {this.props.children}
                </PieChart>
            )
        } else if (chartType === 'linechart') {
            // todo: xaxis and yaxis name
            return (
                <LineChart
                    title={title}
                    data={data}
                    isVertical
                    xaxis={xaxis}
                    yaxis={yaxis}
                    maxValue={maxValue}
                    plotProps={
                        {
                            height: chartHeight,
                            titleFontSize: 20,
                            margin: {bottom: 80}
                        }
                    }
                />
            )
        } else {
            return (
                <NumberChart
                    title={title}
                    data={data}
                    plotProps={
                        {
                            height: chartHeight,
                            titleFontSize: 20,
                            fontSize: 40,
                            titleFontWeight: fontWeight,
                        }
                    }
                />
            )
        }
    }
}

export default Chart;
