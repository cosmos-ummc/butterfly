import {apiUrl, httpClient} from "../data_provider/dataProvider";
import {fetchUtils, HttpError} from "react-admin";
import jwt from "jwt-decode";

export const httpClientLogin = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: "application/json"});
    }
    return fetchUtils.fetchJson(url, options);
};

export const httpClientRefresh = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: "application/json"});
    }
    const refreshToken = localStorage.getItem("refreshToken");
    options.headers.set("Authorization", `${refreshToken}`);
    return fetchUtils.fetchJson(url, options);
};

export default {
    login: ({username, password}) => {
        return new Promise((resolve, reject) => {
            const data = {"email": username, "password": password}
            const url = `${apiUrl}/login`;

            httpClientLogin(url, {
                method: "POST",
                body: JSON.stringify(data)
            })
                .then(response => ({
                    status: response.status,
                    headers: response.headers,
                    token: response.json.accessToken,
                    refreshToken: response.json.refreshToken,
                    username: response.json.displayName,
                    role: response.json.role,
                    uid: response.json.id
                }))
                .then(({status, headers, token, refreshToken, username, role, uid}) => {
                    if (status < 200 || status >= 300) {
                        return reject(new HttpError("error occurred", status));
                    }
                    localStorage.setItem("token", token);
                    localStorage.setItem("refreshToken", refreshToken);
                    localStorage.setItem("username", username);
                    localStorage.setItem("role", role);
                    return resolve()
                })
                .catch(err => {
                    return reject(err);
                });
        });
    },
    logout: () => {
        return new Promise((resolve, reject) => {
            const url = `${apiUrl}/logout`;

            httpClient(url, {method: "POST"})
                .then(response => ({
                    status: response.status,
                }))
                .then(({status, token, refreshToken}) => {
                    if (status < 200 || status >= 300) {
                        console.log("log out fail");
                    }
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("role");
                    localStorage.removeItem("username");
                    return resolve();
                })
        });
    },
    checkError: ({status}) => {
        return new Promise((resolve, reject) => {
            if (status === 401 || status === 403) {
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("role");
                localStorage.removeItem("username");
                return reject();
            }
            return resolve();
        });
    },
    checkAuth: ({source}) => {
        //test token and get new token if expire
        return new Promise(function (resolve, reject) {

            if (source === "resetPassword") {
                return resolve(source);
            }

            if (localStorage.getItem("token") !== null
                && localStorage.getItem("refreshToken") !== null
                && localStorage.getItem("username") !== null
                && localStorage.getItem("role") !== null) {
                const decoded = jwt(localStorage.getItem("token"))

                if (decoded.exp >= Date.now()) {
                    return resolve();
                } else {
                    const url = `${apiUrl}/refresh`;
                    //get new token
                    httpClientRefresh(url, {method: "POST"})
                        .then(response => ({
                            status: response.status,
                            token: response.json.accessToken,
                            refreshToken: response.json.refreshToken
                        }))
                        .then(({status, token, refreshToken}) => {
                            if (status < 200 || status >= 300) {
                                console.log("refresh token expired");
                            }
                            localStorage.removeItem("token");
                            localStorage.removeItem("refreshToken");
                            localStorage.setItem("token", token);
                            localStorage.setItem("refreshToken", refreshToken);
                            return resolve();
                        })
                        .catch(err => {
                            return reject();
                        });
                }
            } else {
                return reject();
            }
        });
    },
    getPermissions: () => {
        const role = localStorage.getItem("role");
        return role ? Promise.resolve(role) : Promise.resolve('guest');
    }
};
