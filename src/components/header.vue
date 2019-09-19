<template>
    <div class="header_wrap" :class="type === 'dark' ? 'header_dark' : 'header_light'">
        <div class="header_content">
            <div class="logo">
                <router-link to="/">
                    <img v-if="type === 'light'" src="../assets/images/logo_light.png" />
                    <img v-else src="../assets/images/logo_dark.png" />
                </router-link>
            </div>
            <div class="navigation_search">
                <nav ref="nav" class="navigation" @mouseover="onmouseover"
                    @mouseout="onmouseout" @click="onClick">
                    <router-link v-for="r in routers"
                        :key="r.path" :to="r.path">{{r.name}}</router-link>
                </nav>
                <span ref="activeBar" class="active_bar"></span>
                <div class="search">
                    <i class="icon-search icon" />
                    <input placeholder="输入关键字查询文章..." v-model="q" @keyup.enter="search" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            positionW: 0,
            positionL: 0,
            q: '',
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
        search() {
            this.$route.path !== '/archive' &&
                this.$router.push(`/archives?type=search&q=${this.q}`)
        }
    },
    watch: {
        $route(to) {
            const i = this.routers.findIndex(r => r.path === to.path);
            if (i > -1) {
                this.$refs.activeBar.style.display = 'block';
                this.setBarPosition(this.$refs.nav.children[i], 'click');
            } else {
                this.$refs.activeBar.style.display = 'none';
            }

            if (to.name === 'movie') {
                this.type = 'dark';
            } else {
                this.type = 'light';
            }
        }
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
.search{
    position: relative;
    margin-left: 23px;
    input{
        outline: none;
        font-size: 12px;
        width: 226px;
        height: 28px;
        border: 1px solid @primary_color;
        border-radius: 14px;
        padding-left: 22px;
    }
    .icon{
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 4px;
        width: 18px;
        height: 18px;
        margin-top: -9px;
        font-size: 18px;
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