import React from "react";
import {Admin, Resource} from "react-admin";
import {createMuiTheme} from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import yellow from '@material-ui/core/colors/yellow';
import Dashboard from "./dashboard/dashboard";
import authProvider from "./auth_provider/authProvider";
import customProvider from "./data_provider/dataProvider";
import CustomLayout from "./layout/customLayout"
import customRoutes from "./custom_routes/customRoutes"
import 'react-vis/dist/style.css';

import {UserList, UserCreate, UserEdit} from './components/users'
import {QuestionCreate, QuestionEdit, QuestionList} from "./components/questions";
import {DeclarationEdit, DeclarationList} from "./components/declarations";
import {MeetingCreate, MeetingEdit, MeetingList} from "./components/meetings";
import {PatientCreate, PatientList, PatientShow} from "./components/patients";

const getThemeBasedOnEnv = () => {
    let theme = {
        sidebar: {width: 350,},
    };
    if (process.env.REACT_APP_ENV === 'dev') {
        theme = {
            ...theme,
            palette: {
                secondary: yellow,
            },
        };
    } else if (process.env.REACT_APP_ENV === 'staging') {
        theme = {
            ...theme,
            palette: {
                secondary: orange,
            },
        };
    } else {
    }
    return createMuiTheme(theme);
};

const RESOURCES = [
    <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} options={{label: 'Admins'}}/>,
    <Resource name="questions" list={QuestionList} create={QuestionCreate} edit={QuestionEdit}
              options={{label: 'Questions'}}/>,
    <Resource name="consultants" list={UserList} create={UserCreate} edit={UserEdit} options={{label: 'Consultants'}}/>,
    <Resource name="patients" list={PatientList} create={PatientCreate} show={PatientShow} options={{label: 'Users'}}/>,
    <Resource name="declarations" options={{label: "Reports"}} edit={DeclarationEdit} list={DeclarationList}/>,
    <Resource name="meetings" list={MeetingList} create={MeetingCreate} edit={MeetingEdit}
              options={{label: 'Meetings'}}/>
];

const RESOURCE_AVAILABLE = {
    "superuser": ["users", "questions", "consultants", "patients", "declarations", "meetings"],
    "consultant": ["consultants", "patients", "declarations", "meetings"],
    "guest": ["users"],
};

const fetchResources = () =>
    authProvider.getPermissions().then(role =>
        RESOURCES.filter(resource => RESOURCE_AVAILABLE[role].includes(resource.props.name))
    );


const HeaderEnvIndicator = () => {
    const elem = (text) => (
        <div style={{
            position: 'fixed', top: 0, left: '50%', marginLeft: '-110px', zIndex: 100,
            display: 'inline-block',
            width: '220px',
            padding: 1,
            backgroundColor: 'red',
            color: 'white',
            border: '2px solid black',
            borderTop: '',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: '0.7em',
        }}>{text}</div>
    );
    switch (process.env.REACT_APP_ENV) {
        case 'dev':
            return elem('DEVELOPMENT ENVIRONMENT');
        default: // production
            return '';
    }
};

// Do not add resource inside Admin element
// add to RESOURCES array instead
const App = () => (
    <React.Fragment>
        <Admin
            customRoutes={customRoutes}
            authProvider={authProvider}
            layout={CustomLayout}
            theme={getThemeBasedOnEnv()}
            dashboard={Dashboard}
            dataProvider={customProvider}
        >
            {fetchResources}
        </Admin>

        <HeaderEnvIndicator/>

        <div style={{
            position: 'fixed', right: 0, bottom: 0, left: 0, zIndex: 100,
            padding: 6,
            backgroundColor: '#efefef',
            textAlign: 'center',
            fontSize: '0.7em',
        }}>For suggestions / help, please email <a href="mailto:helpdesk@xxx.com">helpdesk@xxx.com</a></div>
    </React.Fragment>
);

export default App;
