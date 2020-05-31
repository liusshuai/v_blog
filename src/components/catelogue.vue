<template>
    <div class="catelogue_box">
        <h3 class="cate_title">目录</h3>
        <catelogue-render :datas="datas" />
    </div>
</template>

<script>
import CatelogueRender from './catelogue.js';
export default {
    props: {
        datas: {
            default: () => [],
            type: Array
        }
    },
    components: {
        CatelogueRender
    }
}
</script>

<style lang="less">
@import '../assets/style/common.less';
.catelogue_box{
    width: 315px;
    .box_common_style;
    margin-top: 20px;
    max-height: 600px;
    overflow-y: scroll;
}
.cate_title{
    font-weight: 550;
    font-size: 15px;
    padding-bottom: 4px;
    border-bottom: 1px dashed #eee;
    margin-bottom: 10px;
}
.cate_text{
    display: inline-block;
    margin-bottom: 10px;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    &:hover{
        border-bottom: 1px dashed #ccc;
    }
}
</style>