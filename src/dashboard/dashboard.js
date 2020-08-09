import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Chart from "../components/visualization/chart";
import Button from "@material-ui/core/Button";
import {showNotification as showNotificationAction} from "react-admin";
import {connect} from "react-redux";
import {apiUrl, httpClient} from "../data_provider/dataProvider";
import {
    getTodayDate,
    dateFormatForLineChart,
    getDateDiff,
} from "../utils/dateUtils";

const reportUrl = `${apiUrl}/reports`;
const getStatus = (d) => {
    return {
        date: d.date,
        data: {
            asymptomatic: d.asymptomatic,
            symptomatic: d.symptomatic,
            confirmedButNotAdmitted: d.confirmedButNotAdmitted,
            confirmedAndAdmitted: d.confirmedAndAdmitted,
            completed: d.completed,
            recovered: d.recovered,
            quit: d.quit,
            passedAway: d.passedAway,
        },
    };
};
const getStatusByDays = (daysdata) => {
    return {
        data: {
            statusByDay: daysdata.map((d) => {
                const status = getStatus(d);
                return {
                    ...status.data,
                    date: status.date,
                };
            }),
        },
    };
};

const getCallingStatus = (d) => {
    return {
        date: d.date,
        data: {
            dontHaveToCallCount: d.dontHaveToCallCount,
            patientCalledCount: d.patientCalledCount,
            ummcCalledCount: d.ummcCalledCount,
            noYetCallCount: d.noYetCallCount,
        },
    };
};

const getDeclarationCount = (d) => {
    return {
        date: d.date,
        data: {
            undeclaredCount: d.undeclaredCount,
            declaredCount: d.declaredCount,
        },
    };
};

const dataToBarChart = (data) => {
    return Object.entries(data).map((kv) => ({
        x: kv[0],
        y: Math.max(parseInt(kv[1]), 0),
    }));
};

const getColor = (index) => {
    const color = [
        "#FBC02D", // asymp
        "#F57C00", // symp
        "#ff4081", // conf, not admitted
        "#d32f2f", // conf, admitted
        "#2E7D32", // completed
        "#7CB342", // recovered
        "#757575", // quit
        "#424242", // passedaway
        // "#ff9800",
    ];
    return color[index % color.length];
};

const lineChartLabel = {
    asymptomatic: "Asymptomatic",
    symptomatic: "Symptomatic",
    confirmedButNotAdmitted: "Confirmed But Not Admitted",
    confirmedAndAdmitted: "Confirmed And Admitted",
    completed: "Completed",
    recovered: "Recovered",
    quit: "Quit",
    passedAway: "Passed Away",
};

const dataToLineChart = (data, keys) =>
    keys.map((key, index) => ({
        label: lineChartLabel[key],
        data: data.map((d) => ({
            x: dateFormatForLineChart(d.date),
            y: Math.max(parseInt(d[key], 0)),
        })),
        color: getColor(index),
    }));

const buttonStyle = {
    padding: "10px",
    margin: "10px",
};

class Dashboard extends React.Component {
    // todo: get data from state?
    state = {
        dontHaveToCallCount: 0,
        patientCalledCount: 0,
        ummcCalledCount: 0,
        noYetCallCount: 0,
        date: getTodayDate(),
        undeclaredCount: 0,
        declaredCount: 0,
        asymptomatic: 0,
        symptomatic: 0,
        confirmedButNotAdmitted: 0,
        confirmedAndAdmitted: 0,
        completed: 0,
        recovered: 0,
        quit: 0,
        passedAway: 0,
        statusByDay: [],
    };

    getUpdate = (url, callback) => {
        httpClient(url)
            .then((response) => ({
                status: response.status,
                headers: response.headers,
                data: response.json.data,
            }))
            .then(({status, headers, data}) => {
                if (status < 200 || status >= 300) {
                    console.log(status + data);
                } else {
                    this.setState({...Object.assign({}, callback(data)).data});
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount() {
        this.getUpdate(`${reportUrl}/${this.state.date}?type=1`, getStatus);
        this.getUpdate(
            `${reportUrl}/${this.state.date}?type=2`,
            getDeclarationCount
        );
        this.getUpdate(`${reportUrl}/${this.state.date}?type=3`, getCallingStatus);
        this.getUpdate(
            `${reportUrl}?type=1&from=${getDateDiff(this.state.date, -14)}&to=${
                this.state.date
            }`,
            getStatusByDays
        );
        // setInterval(() => this.getNumberOfUndeclaredPatients(), 10000);
        // setInterval(() => this.getNumberOfNoCallPatients(), 10000);
    }

    render() {
        // const data1 = [
        //   {x: 'symptomatic', y: 10},
        //   {x: 'asymptomatic', y: 5},
        //   {x: 'closed', y: 15},
        //   {x: 'recovered', y: 15},
        // ] // barchart data

        // // todo: toBarChartData

        // const data2 = [
        //   {angle: 1, label: 'A', color: '#4791db', subLabel: '123', value: 123},
        //   {angle: 2, label: 'B', color: '#e33371', subLabel: '456', value: 456},
        //   {angle: 3, label: 'C', color: '#e57373', subLabel: '789', value: 789},
        //   {angle: 4, label: 'D', color: '#ffb74d', subLabel: '111', value: 111}
        // ]
        // // todo: toPieChartData

        // const data3 = [
        //   {
        //     label: "A",
        //     data : [
        //       {x: "01/01/2020", y: 10},
        //       {x: "02/01/2020", y: 14},
        //       {x: "03/01/2020", y: 18},
        //       {x: "04/01/2020", y: 22}
        //     ],
        //     color: '#4791db'
        //   },
        //   {
        //     label : "B",
        //     data : [
        //       {x: "01/01/2020", y: 10},
        //       {x: "02/01/2020", y: 13},
        //       {x: "03/01/2020", y: 16},
        //       {x: "04/01/2020", y: 19}
        //     ],
        //     color : '#e33371',
        //   },
        //   {
        //     label : "C",
        //     data : [
        //       {x: "01/01/2020", y: 10},
        //       {x: "02/01/2020", y: 12},
        //       {x: "03/01/2020", y: 14},
        //       {x: "04/01/2020", y: 16}
        //     ],
        //     color : '#e57373'
        //   },
        //   {
        //     label : "D",
        //     data : [
        //       {x: "01/01/2020", y: 10},
        //       {x: "02/01/2020", y: 11},
        //       {x: "03/01/2020", y: 12},
        //       {x: "04/01/2020", y: 13}
        //     ],
        //     color : '#ffb74d'
        //   }
        // ]

        // const data4 = {value: 1000}

        // console.log(this.state)
        const listOfData = [
            // {title: "number of patients", data: data1, chartType: 'barchart', yaxis: "number of patients"},
            // {title: "number of patients", data: data2, chartType: 'piechart'},
            // {title: "number of patients", data: data3, chartType: 'linechart', yaxis:"number of patients", xaxis:"date"},
            // {title: "number of patients", data: data4, chartType: 'numberchart'}
            {
                title: "Not reported",
                linkText: "> Not reported",
                link: "/#/undeclaredpatients",
                data: {value: this.state.undeclaredCount},
                chartHeight: 200,
                fontWeight: "bold",
            },
            {
                title: "Reported: Unstable & Not Yet Called",
                linkText: "> Reported: Unstable & Not Yet Called",
                link: "/#/nocallpatients",
                data: {value: parseInt(this.state.noYetCallCount)},
                chartHeight: 200,
                fontWeight: "bold",
            },
            {
                title: "Report Status",
                data: dataToBarChart({
                    "No Report": this.state.undeclaredCount,
                    Reported: this.state.declaredCount,
                }),
                chartType: "barchart",
                chartHeight: 300,
                yaxis: "# of Patients",
                gridXS: 4,
            },
            {
                title: "Calling Status",
                data: dataToBarChart({
                    "Patient Called": this.state.patientCalledCount,
                    "PKD Called": this.state.ummcCalledCount,
                    "To Call": this.state.noYetCallCount,
                }),
                chartType: "barchart",
                chartHeight: 300,
                yaxis: "# of Patients",
                gridXS: 4,
            },
            {
                title: "Patients in Different Status",
                data: dataToBarChart({
                    Asymptomatic: this.state.asymptomatic,
                    Symptomatic: this.state.symptomatic,
                    "Confirmed But Not Admitted": this.state.confirmedButNotAdmitted,
                    "Confirmed And Admitted": this.state.confirmedAndAdmitted,
                    Completed: this.state.completed,
                    Recovered: this.state.recovered,
                    Quit: this.state.quit,
                    "Passed Away": this.state.passedAway,
                }),
                chartType: "barchart",
                chartHeight: 300,
                yaxis: "# of Patients",
                gridXS: 4,
            },
            {
                title: `Patients in Different Status from ${dateFormatForLineChart(
                    getDateDiff(this.state.date, -14)
                )} to ${dateFormatForLineChart(this.state.date)}`,
                data: dataToLineChart(this.state.statusByDay, [
                    "asymptomatic",
                    "symptomatic",
                    "confirmedButNotAdmitted",
                    "confirmedAndAdmitted",
                    "completed",
                    "recovered",
                    "quit",
                    "passedAway",
                ]),
                chartType: "linechart",
                chartHeight: 300,
                yaxis: "# of Patients",
                xaxis: "Date",
                gridXS: 12,
            },
        ];

        // todo: generate dynamic components

        // const listOfDataRenders = listOfData.map((data, index) => {
        //     return (
        //         <Grid
        //             item
        //             xs={data.gridXS ? data.gridXS : 6}
        //             key={`${data.chartType}-${index}`}
        //         >
        //             <Chart
        //                 chartHeight={data.chartHeight ? data.chartHeight : 300}
        //                 {...data}
        //             />
        //             {data.link ? (
        //                 <center>
        //                     <Button
        //                         variant="contained"
        //                         color="primary"
        //                         href={data.link}
        //                         style={buttonStyle}
        //                     >
        //                         {data.linkText}
        //                     </Button>
        //                 </center>
        //             ) : null}
        //         </Grid>
        //     );
        // });

        return (
            <Card>
                <CardHeader title="Welcome to the Virtual Patient administration"/>
                <CardContent>
                    <Grid container spacing={3}>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default connect(null, {
    showNotification: showNotificationAction,
})(Dashboard);
