import { get, post } from '@/util/request';
const api = 'blogComment';

export function getCommentByArticle(params) {
    return get(`${api}/getByArticle`, params).then(res => {
        return Promise.resolve(res);
    });
}


export function getCommentByBibi(params) {
    return get(`${api}/getByTweet`, params).then(res => {
        return Promise.resolve(res);
    });
}

export function getCommentByBoard(params) {
    return get(`${api}/getByBoard`, params).then(res => {
        return Promise.resolve(res);
    });
}

export function getCommentByMovie(params) {
    return get(`${api}/getByMovie`, params).then(res => {
        return Promise.resolve(res);
    });
}

export function addComment(params) {
    return post(`${api}/addComment`, params).then(res => {
        return Promise.resolve(res);
    });
}