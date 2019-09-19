import { get } from '@/util/request';
import { author } from '@/util/constants';
const api = 'channel';

export function getArchive() {
    return get(`${api}/getArchive`, {
        author: author
    }).then(res => {
        return Promise.resolve(res);
    });
}