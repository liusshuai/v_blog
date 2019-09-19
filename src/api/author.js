import { get } from '@/util/request';
import { author } from '@/util/constants';
const api = 'author';

export function getInfo() {
    return get(`${api}/getInfo`, {
        id: author
    }).then(res => {
        return Promise.resolve(res);
    });
}