import { get } from '@/util/request';
const api = 'movie';

export function getMovies(params) {
    return get(`${api}/getAll`, {
        page: params.page,
        key: params.key
    }).then(res => {
        return Promise.resolve(res);
    });
}

export function getDetail(id) {
    return get(`${api}/detail`, {id}).then(res => {
        return Promise.resolve(res);
    });
}