<template>
    <div class="info_box_wrap">
        <div class="avatar">
            <img src="../assets/images/avatar.jpg" />
        </div>
        <h3 class="name">{{userInfo.nickname}}</h3>
        <div class="github">
            <i class="icon-github" />
            <a href="https://github.com/liusshuai">https://github.com/liusshuai</a>
        </div>
        <div class="follow_btn" @click="follow"><i class="icon-follow"></i> 订阅我</div>
        <div class="data_info">
            <span>文章：<em>{{userInfo.articlecount}}</em></span>
            <span>留言：<em>{{userInfo.commentCount}}</em></span>
            <span>订阅：<em>{{userInfo.followers}}</em></span>
        </div>

        <follow-me-modal :visible="showFollow" @close="closeFollow"
            @followSuccess="followCallback" />
    </div>
</template>

<script>
import FollowMeModal from '@/components/followMeModal';
import {mapGetters} from 'vuex';
export default {
    data () {
        return {
            showFollow: false
        };
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
        follow() {
            this.showFollow = true;
        },
        closeFollow() {
            this.showFollow = false;
        },
        followCallback() {
            this.data.followers += 1;
            this.closeFollow(); 
        }
    },
    components: {
        FollowMeModal
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
    overflow: hidden;
    img{ width: 100%; }
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
.follow_btn{
    width: 100px;
    height: 32px;
    color: #fff;
    line-height: 32px;
    text-align: center;
    border-radius: 32px;
    background: @primary_color;
    cursor: pointer;
    margin-top: 16px; 
    margin-bottom: 16px;
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