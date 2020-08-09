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
import {WikipediaCreate, WikipediaEdit, WikipediaList} from "./components/wikipedias";
import {ExaminationCreate, ExaminationEdit, ExaminationList} from "./components/examinations";
import {HistoryCreate, HistoryEdit, HistoryList} from "./components/histories";
import {InvestigationCreate, InvestigationEdit, InvestigationList} from "./components/investigations";
import {CaseCreate, CaseEdit, CaseList} from "./components/kases";
import {ResultCreate, ResultList, ResultShow} from "./components/results";

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
    <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit}/>,
    <Resource name="wikipedias" list={WikipediaList} create={WikipediaCreate} edit={WikipediaEdit}
              options={{label: 'Glossary'}}/>,
    <Resource name="examinations" list={ExaminationList} create={ExaminationCreate} edit={ExaminationEdit}/>,
    <Resource name="histories" list={HistoryList} create={HistoryCreate} edit={HistoryEdit}/>,
    <Resource name="investigations" list={InvestigationList} create={InvestigationCreate} edit={InvestigationEdit}/>,
    <Resource name="kases" list={CaseList} create={CaseCreate} edit={CaseEdit} options={{label: 'Cases'}}/>,
    <Resource name="results" list={ResultList} create={ResultCreate} show={ResultShow}/>
];

const RESOURCE_AVAILABLE = {
    "superuser": ["users", "wikipedias", "examinations", "histories", "investigations", "kases", "results"],
    "admin": ["users", "wikipedias", "examinations", "histories", "investigations", "kases", "results"],
    "guest": ["users"],
    "student": ["users"],
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
