<template>
    <div class="share_info_box">
        <span class="tag_hole"></span>
        <span><i class="icon-github" /> <a href="https://github.com/liusshuai" target="_blank"> Github</a></span>
        <span><em>·</em><a href="https://juejin.im/user/59b7f7b26fb9a00a664a08df/posts" target="_blank">掘金</a></span>
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
    top: 6px;
    left: 6px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #f9fafa;
    border: 2px solid #eee;
    background: url('../assets/images/meteor.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>