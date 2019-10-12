<template>
    <div class="search_bar_wrap">
        <i class="icon-search icon" />
        <input type="search" placeholder="输入关键字查询文章..." v-model="q" @keyup.enter="search" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            q: ''
        }
    },
    methods: {
        search() {
            this.$route.path !== '/archive' &&
                this.$router.push(`/archives?type=search&q=${this.q}`)
        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';
.search_bar_wrap{
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
        color: @primary_color;
    }
}

@media screen and (max-width: 768px) {
    .search_bar_wrap input{
        width: 180px;
    }
}

@media screen and (max-width: 360px) {
    .search_bar_wrap input{
        width: 100%;
    }
}
</style>