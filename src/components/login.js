import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userLogin} from 'react-admin';
import {MuiThemeProvider} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import login_img from "../images/login01.PNG";
import grey from "@material-ui/core/colors/grey";
import blueGrey from "@material-ui/core/colors/blueGrey";

const styles = (theme) => ({
    root: {
        height: "100vh",
        width: "100vw",
    },
    title: {
        fontWeight: "bold",
        fontSize: "40px",
    },
    image: {
        backgroundImage: `url(${login_img})`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(255, 255, 255, 1)",
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        height: "100%",
        width: "100%",
        margin: theme.spacing(0, "auto"),
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    inputfield: {
        backgroundColor: grey[200],
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                border: `3px solid ${grey[900]}`,
            },
            "&.Mui-focused fieldset": {
                border: `3px solid ${blueGrey[500]}`, // focus
            },
        },
        "&:hover": {
            backgroundColor: grey[50],
        },
    },
    submit: {
        margin: theme.spacing(3, "auto"),
        backgroundColor: "black",
    },
});

class MySignPage extends Component {

    state = {
        email: "",
        password: ""
    };

    submit = (e) => {
        e.preventDefault();
        // gather your data/credentials here
        const credentials = {
            username: this.state.email,
            password: this.state.password,
        };

        // Dispatch the userLogin action (injected by connect)
        this.props.userLogin(credentials);
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>

                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Typography className={classes.title} component="h1" variant="h5">
                            MHPSS Staff Login
                        </Typography>

                        <form className={classes.form} noValidate>
                            <TextField
                                className={classes.inputfield}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={event => {
                                    this.setState({email: event.target.value});
                                }}
                            />
                            <TextField
                                className={classes.inputfield}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={event => {
                                    this.setState({password: event.target.value});
                                }}
                            />
                            <Grid container>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={this.submit}
                                >
                                    Sign In
                                </Button>
                            </Grid>
                        </form>
                    </div>
                </Grid>

                <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            </Grid>
        );
    }
}

export default withStyles(styles)(connect(undefined, {userLogin})(MySignPage));
