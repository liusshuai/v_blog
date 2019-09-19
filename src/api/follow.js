import { post } from '@/util/request';
import { author } from '@/util/constants';
const api = 'follow';

export function follow(params) {
    return post(`${api}/follow`, {
        aid: author,
        ...params
    }).then(res => {
        return Promise.resolve(res);
    });
}