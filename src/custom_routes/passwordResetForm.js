import React from 'react';
import {Redirect} from 'react-router-dom'
import jwt from "jwt-decode";
import {apiUrl} from "../data_provider/dataProvider";
import {fetchUtils} from "react-admin";
import {useAuthenticated, useNotify} from 'react-admin';
import {makeStyles} from '@material-ui/core/styles';
import {parse} from "query-string";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(3),
        width: '100%',
    },

    background: {
        backgroundImage: 'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)',
    },

    div: {
        marginTop: theme.spacing(3),
    },

    title: {
        fontSize: '14em',
        textAlign: 'center',
    },
    content: {
        marginTop: '6em',
    }
}));

const httpClient = (url, token, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: "application/json"});
    }
    url = url + token;
    return fetchUtils.fetchJson(url, options);
};

const PasswordInput = (classes) => {

    const url = apiUrl + `/users/passwordreset/`;
    const token = classes.token;
    const notify = useNotify();

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        error: false,
        redirect: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const validate = () => {
        if (values.password.length <= 0) {
            setValues({...values, error: true}, resetPass(true));
        } else {
            setValues({...values, error: false}, resetPass(false));
        }
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const renderRedirect = () => {
        if (values.redirect) {
            return <Redirect to='/login'/>
        }
    };

    const resetPass = (error) => {
        if (!error) {
            httpClient(url, token, {
                method: "PUT",
                body: JSON.stringify({"password": values.password})
            })
                .then(response => ({
                    status: response.status,
                }))
                .then(({status}) => {
                    if (status === 200) {
                        notify(`Change password succesfully! Proceed to login.`);
                        setValues({...values, redirect: true});
                    } else {
                        notify(`Update password fail.`, `warning`);
                        setValues({...values, redirect: true});
                    }
                })
                .catch(err => {
                        console.log('Error reset password: fail get backend API: ' + err);
                        notify(`Update password fail.`, `warning`);
                        setValues({...values, redirect: true});
                    }
                )
        }
    };

    return (
        <form onSubmit={validate}>
            {renderRedirect()}
            <div className={useStyles().div}>
                <FormControl>
                    <InputLabel error={values.error} htmlFor="standard-adornment-password">New Password</InputLabel>
                    <Input
                        error={values.error}
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        required
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </div>
            <div className={useStyles().div}>
                <Button variant="contained" color="primary" size="large"
                        startIcon={<SaveIcon/>} onClick={validate} fullWidth>
                    Save
                </Button>
            </div>
        </form>
    )
};

export default function PasswordResetForm(props) {

    useAuthenticated({source: 'resetPassword'});
    const classes = useStyles();
    const notify = useNotify();

    const {token: tokenVal} = parse(props.location.search);
    const token = tokenVal ? tokenVal : "";

    //decode here
    try {
        const decoded = jwt(token);
        if (decoded.accessUuid === "" || decoded.displayName === "" || decoded.authorized !== true) {
            notify(`The link is invalid. Contact admin if this is an error.`, `warning`);
            return <Redirect to='/login'/>;
        }

        if (decoded.exp <= Date.now()) {
            notify(`The link has been expired or has been used.`, `warning`);
            return <Redirect to='/login'/>;
        }
        const displayName = decoded.displayName;

        return (
            <Grid container spacing={0} direction="column" alignItems="center"
                  justify-content="flex-start" style={{minHeight: '100vh'}} className={classes.background}>
                <Grid item xs={12} m={4} className={classes.content}>
                    <Card>
                        <CardHeader title="Reset password" className={classes.title}/>
                        <CardContent>
                            <div>for <b>{displayName}</b></div>
                            <PasswordInput classes={classes} token={token}/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    } catch (err) {
        notify(`The link is invalid. Contact admin if this is an error.`, `warning`);
        return <Redirect to='/login'/>;
    }
};
