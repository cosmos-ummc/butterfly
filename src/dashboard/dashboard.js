import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import {showNotification as showNotificationAction} from "react-admin";
import {connect} from "react-redux";
import {apiUrl, httpClient} from "../data_provider/dataProvider";
import CustomHorizontalBarChart from "../components/visualization/custom-horizontal";
import CustomBarChart from "../components/visualization/custom-bar-chart";

class Dashboard extends React.Component {

    state = {
        data: {
            depressionNormal: 0,
            depressionMild: 0,
            depressionModerate: 0,
            depressionSevere: 0,
            depressionExtreme: 0,
            anxietyNormal: 0,
            anxietyMild: 0,
            anxietyModerate: 0,
            anxietySevere: 0,
            anxietyExtreme: 0,
            stressNormal: 0,
            stressMild: 0,
            stressModerate: 0,
            stressSevere: 0,
            stressExtreme: 0,
            ptsdNormal: 0,
            ptsdSevere: 0,
            depressionCount1: 0,
            depressionCount2: 0,
            anxietyCount1: 0,
            anxietyCount2: 0,
            stressCount1: 0,
            stressCount2: 0,
            ptsdCount1: 0,
            ptsdCount2: 0,
        },
        chartStressSeries: [0, 0, 0, 0, 0],
        chartDepressionSeries: [0, 0, 0, 0, 0],
        chartAnxietySeries: [0, 0, 0, 0, 0],
        chartPtsdSeries: [0, 0],
        chartDassOptions: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: ['Normal', 'Mild', 'Moderate', 'Severe', 'Extremely Severe']
            }
        },
        chartIesrOptions: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: ['Normal/Mild', 'Severe']
            }
        },
        comparisonSeries: [{
            name: "Before Monitoring",
            data: [1, 2, 3, 4],
        }, {
            name: "After Monitoring",
            data: [5, 6, 7, 8],
        }],
        comparisonOptions: {
            chart: {
                type: 'bar',
                height: 430
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    dataLabels: {
                        position: 'top',
                    },
                }
            },
            dataLabels: {
                enabled: true,
                offsetX: -6,
                style: {
                    fontSize: '12px',
                    colors: ['#fff']
                }
            },
            stroke: {
                show: true,
                width: 1,
                colors: ['#fff']
            },
            xaxis: {
                categories: ["Stress", "Anxiety", "Depression", "PTSD"],
            },
        },
    };

    getReport = () => {
        httpClient(`${apiUrl}/reports/1`)
            .then((response) => ({
                status: response.status,
                headers: response.headers,
                data: response.json.data,
            }))
            .then(({status, data}) => {
                if (status < 200 || status >= 300) {
                    console.log(status + data);
                } else {
                    this.setState({data});
                    // set stress series
                    this.setState({chartStressSeries: [data.stressNormal, data.stressMild, data.stressModerate, data.stressSevere, data.stressExtreme]});
                    // set depression series
                    this.setState({chartDepressionSeries: [data.depressionNormal, data.depressionMild, data.depressionModerate, data.depressionSevere, data.depressionExtreme]});
                    // set anxiety series
                    this.setState({chartAnxietySeries: [data.anxietyNormal, data.anxietyMild, data.anxietyModerate, data.anxietySevere, data.anxietyExtreme]});
                    // set ptsd series
                    this.setState({chartPtsdSeries: [data.ptsdNormal, data.ptsdSevere]});
                    // set comparison series
                    this.setState({
                        comparisonSeries: [{
                            name: "Before Monitoring",
                            data: [data.stressCount1, data.anxietyCount1, data.depressionCount1, data.ptsdCount1],
                        }, {
                            name: "After Monitoring",
                            data: [data.stressCount2, data.anxietyCount2, data.depressionCount2, data.ptsdCount2],
                        }]
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount() {
        this.getReport();
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Grid container style={{marginLeft: "50px"}}>
                        <Grid container>
                            <CustomBarChart title={"DASS Stress Count"} propData={this.state.chartStressSeries}
                                            propOption={this.state.chartDassOptions} description={"Number of Users"}/>
                        </Grid>
                        <Grid container>
                            <CustomBarChart title={"DASS Anxiety Count"} propData={this.state.chartAnxietySeries}
                                            propOption={this.state.chartDassOptions} description={"Number of Users"}/>
                        </Grid>
                        <Grid container>
                            <CustomBarChart title={"DASS Depression Count"} propData={this.state.chartDepressionSeries}
                                            propOption={this.state.chartDassOptions} description={"Number of Users"}/>
                        </Grid>
                        <Grid container>
                            <CustomBarChart title={"IES-R Count"} propData={this.state.chartPtsdSeries}
                                            propOption={this.state.chartIesrOptions} description={"Number of Users"}/>
                        </Grid>
                        <Grid container>
                            <CustomHorizontalBarChart title={"Comparison of Severe Users"}
                                                      propData={this.state.comparisonSeries}
                                                      propOption={this.state.comparisonOptions}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default connect(null, {
    showNotification: showNotificationAction,
})(Dashboard);
