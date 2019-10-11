<template>
    <button class="l_button_wrap" @click="click">{{text}}</button>
</template>

<script>
export default {
    props: {
        text: {
            type: String, 
            default: 'click me'
        }
    },
    methods: {
        click() {
            this.$emit('onClick');
        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';
.l_button_wrap{
    height: 26px;
    padding: 0 20px;
    border: 1px solid @primary_color;
    color: @primary_color;
    border-radius: 13px;
    font-size: 14px;
    cursor: pointer;
    outline: none;
    background: transparent;
}
</style>