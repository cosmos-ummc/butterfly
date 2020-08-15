# Submissions

[Link to the demonstration video](https://www.youtube.com/watch?v=gR71QjbmJvo)

[Link to the presentation slides](https://docs.google.com/presentation/d/1YxOG8uyPY6fy_Q7czGD5bJGpYhFRngDTRjdESdkzCLI/edit?usp=sharing)

[Link to the user manual](https://docs.google.com/document/d/1yM8Fy_c3kIlEPvMYso4nH1ZZVMo2aN-5uhWAhb0Vegk/edit?usp=sharing)

[Link to the demonstration video](https://quaranteams-admin.herokuapp.com/#/login)

[Link to the Psychologist / Staff / Admin Login Page](https://quaranteams-admin.herokuapp.com/#/login)

[Link to The Users(Client) Login Page](https://quaranteams-main.herokuapp.com/login) 

[Link to our humanized chat bot](https://t.me/Quaranteams_bot)

[Link to the DASS-21 Original Question Sets](https://journals.plos.org/plosone/article/file?type=supplementary&id=info:doi/10.1371/journal.pone.0219193.s004#:~:text=The%20Depression%2C%20Anxiety%20and%20Stress,into%20subscales%20with%20similar%20content.)

[Link to the IES-R Original Question Sets](https://www.aerztenetz-grafschaft.de/download/IES-R-englisch-5-stufig.pdf)

[Link to the Backend Main Service](https://github.com/cosmos-ummc/comet)

[Link to the Client Website](https://github.com/cosmos-ummc/mayall)

[Link to the Admin Dashboard](https://github.com/cosmos-ummc/butterfly)

[Link to the Backend Chat Service](https://github.com/cosmos-ummc/needle)

[Link to the Telegram Chat Bot](https://github.com/cosmos-ummc/Willman)

# Instructions

This repository is for the admin dashboard frontend. There are several modules included:

- User test results visualization module 

This module offers an overview of users' test results and status.

- Admin module

This modules is used to manage the admins.

- Consultant module

This modules is used to manage the consultants.

- Consultant meeting module

This modules is used to manage the consultants' own meetings, and quick access to the meeting links.

- User module

This module is used to manage the users and access their report and mental health status.

- User report module

This module is used to view the users' reports and the test results.

- User meeting module

This module is used to view the users' own meetings.

- Meeting module

This module is used to manage meetings.

- Report module

This module is used to view details of users' reports that contain the users' answers for every question.

- Content management module

This module is used to manage all the contents that will be displayed to the QUARANTEAM main website. Superuser access is required to access this module.

# Project Setup

- Install [NodeJS](https://nodejs.org/en/) version v12.14.1. 

- Next, clone the repository.

- cd to the project directory and run `npm install` to install the dependencies.

- add the environment variables as follows:

```
REACT_APP_API_URL=<Link to backend main service>
REACT_APP_ENV=dev
```

- run `npm start` to start the service locally.
