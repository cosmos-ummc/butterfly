import React, {Component} from "react";
import Chart from "react-apexcharts";

class CustomBarChart extends Component {
    render() {
        return (
            <div className="graph">
                <h2>{this.props.title}</h2>
                <Chart
                    options={this.props.propOption}
                    series={[{
                        name: this.props.description,
                        data: this.props.propData,
                    }]}
                    type="bar"
                    width="500"
                />
            </div>
        );
    }
}

export default CustomBarChart;
