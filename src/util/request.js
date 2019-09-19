import axios from 'axios';

export function get(api, params = {}) {
    return axios.get(`/api/${api}`, {
        params
    }).then(res => {
        return Promise.resolve(res.data);
    }).catch(err => {
        throw Error(err);
    });
}

export function post(api, params = {}) {
    return axios.post(`/api/${api}`, params).then(res => {
        return Promise.resolve(res.data);
    }).catch(err => {
        throw Error(err);
    });
}