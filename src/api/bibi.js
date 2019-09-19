import { get } from '@/util/request';
const api = 'tweet';

export function getBibis(params) {
    return get(`${api}/getMyTweet`, {
        page: params.page || 1
    }).then(res => {
        return Promise.resolve(res);
    });
}

export function getBibiDetail(id) {
    return get(`${api}/getTweetDetail`, {
        id
    }).then(res => {
        return Promise.resolve(res);
    });
}
