import { get } from '@/util/request';
import { author } from '@/util/constants';
const api = 'article';

export function getArticles(params) {
    return get(`${api}/getByAuthor`, {
        author: author,
        page: params.page || 1,
        limit: params.limit || 5,
        show: 1
    }).then(res => {
        return Promise.resolve(res);
    });
}

export function getArticleDetail(id) {
    return get(`${api}/getOneById`, {
        id: id
    }).then(res => {
        return Promise.resolve(res);
    });
}

export function getNear(id) {
    return get(`${api}/getAdjacent`, {
        id,
        author
    }).then(res => {
        return Promise.resolve(res);
    });
}

export function getArticleByChannel(cid) {
    return get(`${api}/getArchiveArticleByChannel`, {
        cid,
        author
    }).then(res => {
        return Promise.resolve(res);
    });
}

export function getArticleByTag(tag) {
    return get(`${api}/getArchiveArticleByTag`, {
        tag,
        author
    }).then(res => {
        return Promise.resolve(res);
    });
}

export function getArticleByQ(q) {
    return get(`${api}/getByKeyword`, {
        keyword: q,
        limit: 100,
        show: 1
    }).then(res => {
        return Promise.resolve(res);
    });
}

export function likeArticle(id) {
    return get(`${api}/like`, {
        id
    }).then(res => {
        return Promise.resolve(res);
    });
}