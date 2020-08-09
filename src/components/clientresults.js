import React from 'react';
import {apiUrl, httpClient} from "../data_provider/dataProvider";
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import TextField from '@material-ui/core/TextField';

export class ClientResultTab extends React.Component {

    state = {
        data: null
    };

    loadClientResult = (clientId) => {
        const url = `${apiUrl}/client/results/${clientId}`;
        httpClient(url)
            .then((response) => ({
                status: response.status,
                headers: response.headers,
                data: response.json,
            }))
            .then(({status, headers, data}) => {
                if (status >= 200 && status < 300) {
                    this.setState({data: data});
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount() {
        console.log(this.props.clientId);
        this.loadClientResult(this.props.clientId);
    }

    componentDidUpdate(oldProps) {
        if (oldProps.clientId !== this.props.clientId) {
            this.loadClientResult(this.props.clientId);
        }
    }

    render() {
        let history = null;
        let diagnosis = null;
        let examination = null;
        let investigation = null;
        if (this.state.data !== null) {
            history = this.state.data.history;
            diagnosis = this.state.data.diagnosis;
            examination = this.state.data.examination;
            investigation = this.state.data.investigation;
        }
        return (
            <div>
                <Typography variant="h6">Physical Examination</Typography>
                {
                    examination !== null &&
                    <div>
                        <Typography style={{marginTop: "15px"}} variant="body1">Selected Correct Answer</Typography>
                        {examination.selectedAndCorrect.map((sca, index) => (
                            <div>
                                <TextField>{index + 1}. {sca.question}</TextField>
                            </div>
                        ))}

                        <Typography style={{marginTop: "15px"}} variant="body1">Selected Wrong Answer</Typography>
                        {examination.selectedAndCorrect.map((swa, index) => (
                            <div>
                                <TextField>{index + 1}. {swa.question}</TextField>
                            </div>
                        ))}

                        <Typography style={{marginTop: "15px"}} variant="body1">Missed</Typography>
                        {examination.missed.map((mi, index) => (
                            <Typography>{index + 1}. {mi.question}</Typography>
                        ))}

                        <Typography style={{marginTop: "15px"}} variant="body1">Score: {examination.scores}</Typography>
                    </div>
                }

                <br/>
                <Divider style={{marginTop: "20px", width: "100%", height: "1.5px", backgroundColor: "black"}}/>
                <Typography variant="h6">Investigation</Typography>
                {
                    investigation !== null &&
                    <div>
                        <Typography style={{marginTop: "15px"}} variant="body1">Selected Correct Answer</Typography>
                        {investigation.selectedAndCorrect.map((sca, index) => (
                            <div>
                                <TextField>{index + 1}. {sca.question}</TextField>
                            </div>
                        ))}

                        <Typography style={{marginTop: "15px"}} variant="body1">Selected Wrong Answer</Typography>
                        {investigation.selectedAndCorrect.map((swa, index) => (
                            <div>
                                <TextField>{index + 1}. {swa.question}</TextField>
                            </div>
                        ))}

                        <Typography style={{marginTop: "15px"}} variant="body1">Missed</Typography>
                        {investigation.missed.map((mi, index) => (
                            <Typography>{index + 1}. {mi.question}</Typography>
                        ))}
                        <Typography style={{marginTop: "15px"}}
                                    variant="body1">Score: {investigation.scores}</Typography>

                    </div>
                }

                <br/>
                <Divider style={{marginTop: "20px", width: "100%", height: "1.5px", backgroundColor: "black"}}/>
                <Typography variant="h6">Diagnosis</Typography>
                {
                    diagnosis !== null &&
                    <div>
                        <Typography style={{marginTop: "15px"}} variant="body1">Correct Answer Submitted</Typography>
                        {diagnosis.correct.map((ca, index) => (
                            <div>
                                <TextField>{index + 1}. {ca.question}</TextField>
                            </div>
                        ))}

                        <Typography style={{marginTop: "15px"}} variant="body1">Missed</Typography>
                        {diagnosis.missed.map((mi, index) => (
                            <Typography>{index + 1}. {mi}</Typography>
                        ))}
                        <Typography style={{marginTop: "15px"}} variant="body1">Score: {diagnosis.scores}</Typography>

                    </div>
                }

                <br/>
                <Divider style={{marginTop: "20px", width: "100%", height: "1.5px", backgroundColor: "black"}}/>
                <Typography variant="h6">Total Score</Typography>
                {
                    this.state.data !== null &&
                    <div>
                        <Typography style={{marginTop: "15px"}} variant="body1">Total
                            Score:{this.state.data.scores}</Typography>
                    </div>
                }

                <br/>
                <Divider style={{marginTop: "20px", width: "100%", height: "1.5px", backgroundColor: "black"}}/>
                <Typography variant="h6">Duration</Typography>
                {
                    this.state.data !== null &&
                    <div>
                        <Typography style={{marginTop: "15px"}}
                                    variant="body1">Duration: {this.state.data.duration / 1000} seconds</Typography>
                    </div>
                }

                <br/><br/>
            </div>

        )
    }
}
