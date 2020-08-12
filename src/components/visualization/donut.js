import React, {Component} from "react";
import Chart from "react-apexcharts";

class Donut extends Component {
    render() {
        return (
            <div className="donut">
                <h2>{this.props.title}</h2>
                <Chart options={this.props.propOption} series={this.props.propData} type="donut" width="500"/>
            </div>
        );
    }
}

export default Donut;
