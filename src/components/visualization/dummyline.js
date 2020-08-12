
import React, { Component } from "react";
import Chart from "react-apexcharts";

class Dummyline extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: "basic-line"
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
                }
            },
            series: [
                {
                    name: "Number of Results Submitted",
                    data: [30, 40, 45, 50, 49, 60, 70, 91]
                }
            ]
        };
    }

    render() {
        return (
            <div className="app">
                <h1>Number of Results Submitted</h1>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    width="500"
                />
            </div>
        );
    }
}

export default Dummyline;
