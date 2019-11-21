<template>
    <div class="share_info_box">
        <span class="tag_hole"></span>
        <span><i class="icon-github" /> <a href="https://github.com/liusshuai" target="_blank"> Github</a></span>
        <span><em>·</em><a href="https://juejin.im/user/5d43a7b9f265da03d2111fce/activities" target="_blank">掘金</a></span>
        <span><em>·</em><a href="https://www.zhihu.com/people/liu-shuai-9-86-15/activities" target="_blank">知乎</a></span>
    </div>
</template>

<style lang="less" scoped>
@import '../assets/style/common.less';
.share_info_box{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 315px;
    .box_common_style;
    a{
        font-size: 15px;
    }
    em{
        font-size: 24px;
    }
    em, i{
        margin-right: 2px;
    }
    span{
        display: flex;
        align-items: center;
    }
}
.tag_hole{
    position: absolute;
    top: 10px;
    left: 10px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #f9fafa;
    border: 2px solid #eee;
}
</style>