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
import {ConsultantCreate, ConsultantList, ConsultantShow} from "./components/consultants";
import {FeedCreate, FeedEdit, FeedList} from "./components/feeds";
import {GameCreate, GameEdit, GameList} from "./components/games";
import {MeditationCreate, MeditationEdit, MeditationList} from "./components/meditations";

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
    <Resource name="consultants" list={ConsultantList} create={ConsultantCreate} show={ConsultantShow}
              options={{label: 'Consultants'}}/>,
    <Resource name="patients" list={PatientList} create={PatientCreate} show={PatientShow} options={{label: 'Users'}}/>,
    <Resource name="meetings" list={MeetingList} create={MeetingCreate} edit={MeetingEdit}
              options={{label: 'Meetings'}}/>,
    <Resource name="declarations" options={{label: "Reports"}} edit={DeclarationEdit} list={DeclarationList}/>,
    <Resource name="questions" list={QuestionList} create={QuestionCreate} edit={QuestionEdit}
              options={{label: 'Questions'}}/>,
    <Resource name="feeds" list={FeedList} create={FeedCreate} edit={FeedEdit}
              options={{label: 'Health Feeds'}}/>,
    <Resource name="games" list={GameList} create={GameCreate} edit={GameEdit}
              options={{label: 'Games'}}/>,
    <Resource name="meditations" list={MeditationList} create={MeditationCreate} edit={MeditationEdit}
              options={{label: 'Meditations'}}/>
];

const RESOURCE_AVAILABLE = {
    "superuser": ["users", "questions", "feeds", "games", "meditations", "consultants", "patients", "declarations", "meetings"],
    "consultant": ["consultants", "patients", "declarations", "meetings"],
    "guest": ["users"],
};

const fetchResources = () =>
    authProvider.getPermissions().then(role =>
        RESOURCES.filter(resource => RESOURCE_AVAILABLE[role].includes(resource.props.name))
    );

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
