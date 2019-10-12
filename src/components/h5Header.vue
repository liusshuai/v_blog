<template>
    <div>
        <div class="h5_header_box">
            <div class="header_content">
                <div class="logo_nav">
                    <router-link to="/">
                    <div class="logo">
                        <img src="http://www.lsshuai.com/static/images/logo_dark.png" />
                    </div>
                    </router-link>
                    <div @click="opennav"><i class="icon-menu" /></div>
                </div>
                <search-bar />
            </div>
        </div>
        <transition name="mask">
            <div v-show="isOpenNav" class="mask" @click="closenav" ref="mask"></div>
        </transition>
        <div class="side_nav_list" ref="nav">
            <div class="my_base_info">
                <div class="my_avatar"></div>
                <h2 class="my_nickname">{{userInfo.nickname}}</h2>
                <follow-btn @followCallback="followCallback" />
                <div class="data_info">
                    <span>文章：<em>{{userInfo.articlecount}}</em></span>
                    <span>|</span>
                    <span>留言：<em>{{userInfo.commentCount}}</em></span>
                    <span>|</span>
                    <span>订阅：<em>{{userInfo.followers}}</em></span>
                </div>
            </div>

            <nav class="navs_wrap">
                <router-link v-for="r in routers"
                    :key="r.path" :to="r.path">{{r.name}}</router-link>
            </nav>
        </div>
    </div>
</template>

<script>
import SearchBar from '@/components/searchBar';
import FollowBtn from '@/components/followBtn';
import { userInfoMixin } from '@/util/mixin';
export default {
    mixins: [userInfoMixin],
    data() {
        return {
            isOpenNav: false
        };
    },
    created() {
        this.routers = [{
            name: '首页',
            path: '/'
        }, {
            name: 'Bibi',
            path: '/bibi'
        }, {
            name: '归档',
            path: '/archives'
        }, {
            name: '资源 🎬',
            path: '/movie'
        }, {
            name: '留言板',
            path: '/board'
        }, {
            name: '关于',
            path: '/about'
        }];
    },
    methods: {
        opennav() {
            this.isOpenNav = true;
            this.$refs.nav.style.left = '0';
        },
        closenav() {
            this.isOpenNav = false;
            this.$refs.nav.style.left = '-240px';
        }
    },
    watch: {
        $route() {
            this.isOpenNav && this.closenav();
        }
    },
    components: {
        SearchBar,
        FollowBtn
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';
.h5_header_box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    color: #fff;
    background: @primary_color;
    padding: 0 14px;
    z-index: 7;
}
.header_content,
.logo_nav{
    display: flex;
    align-items: center;
    height: 50px;
}
.header_content{
    justify-content: space-between;
}
.logo{
    width: 80px;
    margin-right: 16px;
}
.icon-menu{
    font-size: 20px;
}
.side_nav_box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .4);
    z-index: 8;
}
.side_nav_list{
    position: fixed;
    top: 0;
    left: -240px;
    width: 240px;
    height: 100%;
    background: @primary_color;
    padding: 20px;
    color: #fff;
    transition: all .3s;
    z-index: 9;
}
.my_nickname{
    text-align: center;
    font-weight: bold;
    margin: 10px 0 20px;
}
.my_avatar{
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background: url('http://www.lsshuai.com/static/images/avatar.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0 auto;
}
.data_info{
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    em{
        font-size: 14px;
        font-weight: bold;
    }
}
.navs_wrap{
    margin-top: 20px;
    a{
        display: block;
        color: #fff;
        padding: 10px 14px 10px 0;
        border-bottom: 1px dashed #2d3034
    }
}

.mask-enter-active {
  transition: all .3s ease-in;
}

.mask-enter{
  opacity: 0;
}
</style>