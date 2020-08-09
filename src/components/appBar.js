import React from 'react';
import {AppBar} from 'react-admin';
import {CustomUserMenu} from "./menu";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {getName} from '../utils/util'

const useStyles = makeStyles({
    title: {
        flex: 'none',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
});

export const MyAppBar = props => {
    const classes = useStyles();
    return (
        <AppBar
            {...props}
            userMenu={<CustomUserMenu/>}
        >
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            <span className={classes.spacer}/>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
            >
                Hi, {getName()}
            </Typography>
        </AppBar>
    )
};
