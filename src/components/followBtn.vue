<template>
    <div>
        <div class="follow_btn" @click="follow"><i class="icon-follow"></i> 订阅我</div>

        <follow-me-modal :visible="showFollow" @close="closeFollow"
            @followSuccess="followCallback" />
    </div>
</template>

<script>
import FollowMeModal from '@/components/followMeModal';
export default {
    data () {
        return {
            showFollow: false
        };
    },
    methods: {
        follow() {
            this.showFollow = true;
        },
        closeFollow() {
            this.showFollow = false;
        },
        followCallback() {
            this.closeFollow();
            this.$emit('followCallback');
        }
    },
    components: {
        FollowMeModal
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';
.follow_btn{
    width: 100px;
    height: 32px;
    color: #fff;
    line-height: 32px;
    text-align: center;
    border-radius: 32px;
    background: @primary_color;
    cursor: pointer;
    margin: 16px auto;
}
@media screen and (max-width: 768px) {
    .follow_btn{
        width: 100%;
        background: transparent;
        border: 1.2px solid #fff;
    }
    
}
</style>