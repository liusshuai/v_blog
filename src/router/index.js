import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Home = (resolve) => {
    import('../pages/home').then((module) => {
        resolve(module);
    });
};

const Bibi = (resolve) => {
    import('../pages/bibi').then((module) => {
        resolve(module);
    });
};

const Archive = (resolve) => {
    import('../pages/archives').then((module) => {
        resolve(module);
    });
};

const MessageBoard = (resolve) => {
    import('../pages/messageBoard').then((module) => {
        resolve(module);
    });
};

const About = (resolve) => {
    import('../pages/about').then((module) => {
        resolve(module);
    });
};

const ArticleDetail = (resolve) => {
    import('../pages/articleDetail').then((module) => {
        resolve(module);
    });
};

const BibiDetail = (resolve) => {
    import('../pages/bibiDetail').then((module) => {
        resolve(module);
    });
};

const MovieSource = (resolve) => {
    import('../pages/movieSource').then((module) => {
        resolve(module);
    });
};

const MovieSourceDetail = (resolve) => {
    import('../pages/movieSourceDetail').then((module) => {
        resolve(module);
    });
};

export default new Router({
    mode: 'history',
    routes: [{
            path: '*',
            redirect: '/'
        },
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/bibi',
            name: 'bibi',
            component: Bibi
        },
        {
            path: '/bibi/:id',
            name: 'bibiDetail',
            component: BibiDetail
        },
        {
            path: '/betail',
            name: 'betail',
            component: BibiDetail
        },
        {
            path: '/archives',
            name: 'archives',
            component: Archive
        },
        {
            path: '/board',
            name: 'board',
            component: MessageBoard
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/article/:id',
            name: 'articleDetail',
            component: ArticleDetail
        },
        {
            path: '/movie',
            name: 'movie',
            component: MovieSource
        },
        {
            path: '/movie/:id',
            name: 'movieDetail',
            component: MovieSourceDetail
        }
    ]
});