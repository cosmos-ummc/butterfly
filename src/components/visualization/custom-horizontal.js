import React from "react";
import Chart from "react-apexcharts";

class CustomHorizontalBarChart extends React.Component {
    render() {
        return (
            <div id="chart">
                <h2>{this.props.title}</h2>
                <Chart options={this.props.propOption} series={this.props.propData} type="bar" width="500"
                       height={430}/>
            </div>
        )
    }
}

export default CustomHorizontalBarChart;
