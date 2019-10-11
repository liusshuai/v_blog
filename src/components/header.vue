<template>
    <div class="header_wrap" :class="type === 'dark' ? 'header_dark' : 'header_light'">
        <div class="header_content">
            <div class="logo">
                <router-link to="/">
                    <img v-if="type === 'light'" src="http://www.lsshuai.com/static/images/logo_light.png" />
                    <img v-else src="http://www.lsshuai.com/static/images/logo_dark.png" />
                </router-link>
            </div>
            <div class="navigation_search">
                <nav ref="nav" class="navigation" @mouseover="onmouseover"
                    @mouseout="onmouseout" @click="onClick">
                    <router-link v-for="r in routers"
                        :key="r.path" :to="r.path">{{r.name}}</router-link>
                </nav>
                <span ref="activeBar" class="active_bar"></span>
                <search-bar />
            </div>
        </div>
    </div>
</template>

<script>
import SearchBar from '@/components/searchBar';
export default {
    data() {
        return {
            positionW: 0,
            positionL: 0,
            type: 'light'
        }
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
    mounted() {
        this.activeBar(location.pathname);
    },
    methods: {
        onmouseover(e) {
            this.setBarPosition(e.target, 'mouse');
        },
        onmouseout() {
            this.setBarPosition();
        },
        onClick(e) {
            this.setBarPosition(e.target, 'click');
        },
        setBarPosition(e, type) {
            if (e && type === 'click') {
                this.positionW = e.clientWidth;
                this.positionL = e.offsetLeft;
            }

            const width = type === 'mouse' ? e.clientWidth : this.positionW;
            const left = type === 'mouse' ? e.offsetLeft : this.positionL;

            this.$refs.activeBar.style.width = width + 'px';
            this.$refs.activeBar.style.left = left + 'px';
        },
        activeBar(path) {
            const i = this.routers.findIndex(r => r.path === path);
            if (i > -1) {
                this.$refs.activeBar.style.display = 'block';
                this.setBarPosition(this.$refs.nav.children[i], 'click');
            } else {
                this.$refs.activeBar.style.display = 'none';
            }

            if (path === '/movie') {
                this.type = 'dark';
            } else {
                this.type = 'light';
            }
        }
    },
    watch: {
        $route(to) {
            this.activeBar(to.path);
        }
    },
    components: {
        SearchBar
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';

.header_wrap{
    position: relative;
    padding: 20px 0;
    box-shadow: rgba(80, 80, 80, 0.11) 0px 1px 3px 0px;
    transition: all .1s ease-in;
}
.header_light{
    background: #fff;
}
.header_dark{
    background: @primary_color;
    .navigation{
        a{
            color: #999;
            display: inline-block;
            padding: 0 23px;
            &:hover{
                color: #fff;
            }
        }
        .router-link-exact-active{
            color: #fff;
        }
    }

    .active_bar{
        background: #fff;
    }
}
.header_content{
    width: @page_max_width;
    margin: 0 auto;
}
.header_content,
.navigation_search,
.navigation{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logo{
    width: 120px;
    img{ width: 100%; }
}
.navigation{
    a{
        display: inline-block;
        padding: 0 23px;
        &:hover{
            color: @primary_color;
        }
    }
    .router-link-exact-active{
        color: @primary_color;
    }
}
.active_bar{
    position: absolute;
    width: 50px;
    height: 2px;
    bottom: 0;
    background: @primary_color;
    transition: all .3s;
}
</style>