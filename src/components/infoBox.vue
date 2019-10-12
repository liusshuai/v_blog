<template>
    <div class="info_box_wrap">
        <div class="avatar"></div>
        <h3 class="name">{{userInfo.nickname}}</h3>
        <div class="github">
            <i class="icon-github" />
            <a href="https://github.com/liusshuai" target="_blank">https://github.com/liusshuai</a>
        </div>
        <follow-btn @followCallback="followCallback" />
        <div class="data_info">
            <span>文章：<em>{{userInfo.articlecount}}</em></span>
            <span>留言：<em>{{userInfo.commentCount}}</em></span>
            <span>订阅：<em>{{userInfo.followers}}</em></span>
        </div>
    </div>
</template>

<script>
import FollowBtn from '@/components/followBtn';
import { userInfoMixin } from '@/util/mixin';
export default {
    mixins: [userInfoMixin],
    components: {
        FollowBtn
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';
.info_box_wrap{
    width: 315px;
    .box_common_style;
    text-align: center;
    margin-bottom: 20px;
}
.avatar{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: url('http://www.lsshuai.com/static/images/avatar.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}
.avatar,
.follow_btn{
    margin: 0 auto;
}
.name{
    font-size: 18px;
    margin-top: 16px;

}
.base_info{
    display: flex;
    align-items: center;
}
.data_info{
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    color: #ccc;
    padding: 12px 0;
    border-top: 1px solid #eee;
    em{
        color: @primary_color;
        font-size: 20px;
        font-weight: bold;
        margin-left: 4px;
        cursor: pointer;
    }
}
.github{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    margin-top: 10px;
    i{
        font-size: 17px;
        margin-right: 4px;
    }
}
</style>