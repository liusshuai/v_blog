import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Index = () => import('../pages/index');

const Home = () => import('../pages/home');

const Bibi = () => import('../pages/bibi');

const Archive = () => import('../pages/archives');

const MessageBoard = () => import('../pages/messageBoard');

const About = () => import('../pages/about');

const ArticleDetail = () => import('../pages/articleDetail');

const BibiDetail = () => import('../pages/bibiDetail');

const MovieSource = () => import('../pages/movieSource');

const MovieSourceDetail = () => import('../pages/movieSourceDetail');

const ArticleDetailH5 = () => import('../h5/article');

const MovieDetailH5 = () => import('../h5/movie');

export default new Router({
    mode: 'history',
    routes: [{
            path: '*',
            redirect: '/'
        },
        {
            path: '/',
            component: Index,
            children: [
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
        },
        {
            path: '/h5/article/:id',
            name: 'h5_articleDetail',
            component: ArticleDetailH5
        },
        {
            path: '/h5/movie/:id',
            name: 'h5_movieDetail',
            component: MovieDetailH5
        }, {
            path: '/h5/about',
            name: 'h5_about',
            component: About
        }
    ]
});