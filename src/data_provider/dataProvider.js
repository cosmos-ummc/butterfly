import {fetchUtils, HttpError} from "react-admin";
import {stringify} from "query-string";

export const apiUrl = process.env.REACT_APP_API_URL;

export const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: "application/json"});
    }
    const token = localStorage.getItem("token");
    options.headers.set("Authorization", `${token}`);
    return fetchUtils.fetchJson(url, options);
};

const baseDataProvider = {
    getList: (resource, params) => {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;

        let filterItem = "";
        let filterValue = "";
        console.log(params.filter);
        console.log(params.data);
        // take the last value only
        if (params.filter !== null) {
            Object.keys(params.filter).forEach((key) => {
                    filterItem = key;
                    filterValue = params.filter[key];
                }
            )
        }

        const query = {
            item: field,
            order: order,
            from: (page - 1) * perPage,
            to: page * perPage - 1,
            filterItem: filterItem,
            filterValue: filterValue
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return new Promise((resolve, reject) => {
            httpClient(url)
                .then(response => ({
                    status: response.status,
                    headers: response.headers,
                    data: response.json.data,
                    total: response.json.total
                }))
                .then(({status, headers, data, total}) => {
                    total = parseInt(total, 10);
                    if (status < 200 || status >= 300) {
                        return reject(new HttpError("error occurred", status, data, total));
                    }
                    return resolve({status, headers, data, total});
                })
                .catch(err => {
                    if (err.body && err.body.message)
                        return reject(new HttpError(err.body.message, err.status));
                    else
                        return reject(new HttpError('error occurred', err.status))
                });
        });
    },

    getOne: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        console.log("i am get oneeee");


        return new Promise((resolve, reject) => {
            httpClient(url)
                .then(response => ({
                    status: response.status,
                    headers: response.headers,
                    data: response.json.data
                }))
                .then(({status, headers, data}) => {
                    if (status < 200 || status >= 300) {
                        return reject(new HttpError("error occurred", status, data));
                    }
                    console.log('receive getOne', data);
                    return resolve({status, headers, data});
                })
                .catch(err => {
                    if (err.body && err.body.message)
                        return reject(new HttpError(err.body.message, err.status));
                    else
                        return reject(new HttpError('error occurred', err.status))
                });
        });
    },

    getMany: (resource, params) => {
        const query = {
            ids: params.ids
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return new Promise((resolve, reject) => {
            httpClient(url)
                .then(response => ({
                    status: response.status,
                    headers: response.headers,
                    data: response.json.data
                }))
                .then(({status, headers, data}) => {
                    if (status < 200 || status >= 300) {
                        return reject(new HttpError("error occurred", status, data));
                    }
                    return resolve({status, headers, data});
                })
                .catch(err => {
                    if (err.body && err.body.message)
                        return reject(new HttpError(err.body.message, err.status));
                    else
                        return reject(new HttpError('error occurred', err.status))
                });
        });
    },

    getManyReference: (resource, params) => {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;

        let filterItem = params.target;
        let filterValue = params.id;
        if (params.filter !== null && params.filter.size > 0) {
            params.filter.forEach(function (value, key) {
                filterItem = key;
                filterValue = value;
            });
        }

        const query = {
            item: field,
            order: order,
            from: (page - 1) * perPage,
            to: page * perPage - 1,
            filterItem: filterItem,
            filterValue: filterValue
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return new Promise((resolve, reject) => {
            httpClient(url)
                .then(response => ({
                    status: response.status,
                    headers: response.headers,
                    data: response.json.data,
                    total: parseInt(response.json.total, 10)
                }))
                .then(({status, headers, data, total}) => {
                    if (status < 200 || status >= 300) {
                        return reject(new HttpError("error occurred", status, data));
                    }
                    return resolve({status, headers, data, total});
                })
                .catch(err => {
                    if (err.body && err.body.message)
                        return reject(new HttpError(err.body.message, err.status));
                    else
                        return reject(new HttpError('error occurred', err.status))
                });
        });
    },

    update: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        console.log('date', params.data.date)
        console.log(params.data);
        return new Promise((resolve, reject) => {
            const body = {
                data: params.data
            };
            httpClient(url, {
                method: "PUT",
                body: JSON.stringify(body)
            })
                .then(response => ({
                    status: response.status,
                    headers: response.headers,
                    data: response.json.data
                }))
                .then(({status, headers, data}) => {
                    if (status < 200 || status >= 300) {
                        return reject(new HttpError("error occurred", status, data));
                    }
                    return resolve({status, headers, data});
                })
                .catch(err => {
                    if (err.body && err.body.message)
                        return reject(new HttpError(err.body.message, err.status));
                    else
                        return reject(new HttpError('error occurred', err.status))
                });
        });
    },

    updateMany: (resource, params) => {
        const query = {
            ids: params.ids
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return new Promise((resolve, reject) => {
            httpClient(url, {
                method: "PUT",
                body: JSON.stringify(params.data)
            })
                .then(response => ({
                    status: response.status,
                    headers: response.headers,
                    data: response.json.data
                }))
                .then(({status, headers, data}) => {
                    if (status < 200 || status >= 300) {
                        return reject(new HttpError("error occurred", status, data));
                    }
                    return resolve({status, headers, data});
                })
                .catch(err => {
                    if (err.body && err.body.message)
                        return reject(new HttpError(err.body.message, err.status));
                    else
                        return reject(new HttpError('error occurred', err.status))
                });
        });
    },

    create: (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        console.log(params);
        return new Promise((resolve, reject) => {
            httpClient(url, {
                method: "POST",
                body: JSON.stringify(params.data)
            })
                .then(response => ({
                    status: response.status,
                    headers: response.headers,
                    id: response.json.id
                }))
                .then(({status, headers, id}) => {
                    if (status < 200 || status >= 300) {
                        return reject(new HttpError("error occurred", status, id));
                    }
                    return resolve({status, headers, id});
                })
                .catch(err => {
                    if (err.body && err.body.message)
                        return reject(new HttpError(err.body.message, err.status));
                    else
                        return reject(new HttpError('error occurred', err.status))
                });
        });
    },

    delete: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;

        return new Promise((resolve, reject) => {
            httpClient(url, {
                method: "DELETE"
            })
                .then(response => ({
                    status: response.status,
                    headers: response.headers,
                    data: {}
                }))
                .then(({status, headers, data}) => {
                    if (status < 200 || status >= 300) {
                        return reject(new HttpError("error occurred", status, data));
                    }
                    return resolve({status, headers, data});
                })
                .catch(err => {
                    if (err.body && err.body.message)
                        return reject(new HttpError(err.body.message, err.status));
                    else
                        return reject(new HttpError('error occurred', err.status))
                });
        });
    },

    deleteMany: (resource, params) => {
        const query = {
            ids: params.ids
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return new Promise((resolve, reject) => {
            httpClient(url, {
                method: "DELETE"
            })
                .then(response => ({
                    status: response.status,
                    headers: response.headers,
                    data: response.data
                }))
                .then(({status, headers, data}) => {
                    if (status < 200 || status >= 300) {
                        return reject(new HttpError("error occurred", status, data));
                    }
                    return resolve({status, headers, data});
                })
                .catch(err => {
                    if (err.body && err.body.message)
                        return reject(new HttpError(err.body.message, err.status));
                    else
                        return reject(new HttpError('error occurred', err.status))
                });
        });
    }
};

// Special cases are here:
const myDataProvider = {
    ...baseDataProvider,
    create: (resource, params) => {
        console.log(params);

        // below is for swabs:create and patients:create only
        if (resource === 'questions' || resource === 'patients' || resource === 'users' ||
            resource === 'consultants' || resource === 'declarations' || resource === 'meetings' || resource === 'feeds') {

            // - append /patientId at end
            let url = '';
            if (resource === 'questions') {
                url = `${apiUrl}/${resource}/0`;
            } else if (resource === 'patients') {
                url = `${apiUrl}/${resource}/${params.data.id}`
            } else if (resource === 'users') {
                url = `${apiUrl}/${resource}/0`
            } else if (resource === 'consultants') {
                url = `${apiUrl}/${resource}/0`
            } else if (resource === 'declarations') {
                url = `${apiUrl}/${resource}/0`
            } else if (resource === 'meetings') {
                url = `${apiUrl}/${resource}/0`
            } else if (resource === 'feeds') {
                url = `${apiUrl}/${resource}/0`
            }

            return new Promise((resolve, reject) => {
                httpClient(url, {
                    method: "POST",
                    body: JSON.stringify({data: params.data})
                })
                    .then(response => {
                        return ({
                            status: response.status,
                            headers: response.headers,
                            data: response.json.data
                        })
                    })
                    .then(({status, headers, data}) => {
                        if (status < 200 || status >= 300) {
                            return reject(new HttpError("error occurred", status, {message: data}));
                        }
                        return resolve({status, headers, data});
                    })
                    .catch(err => {
                        if (err.body && err.body.message)
                            return reject(new HttpError(err.body.message, err.status));
                        else
                            return reject(new HttpError('error occurred', err.status))
                    });
            });
        } else {
            return baseDataProvider.create(resource, params);
        }
    },
};

export default myDataProvider;
