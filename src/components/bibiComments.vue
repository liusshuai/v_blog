<template>
    <ul class="bibi_comments_wrap">
        <li v-for="item in data" :key="item.id">
            <div>
                <span class="user_name">{{item.username}}</span>
                <span class="block" v-show="item.replyname">回复了</span>
                <span class="user_name" v-show="item.replyname">{{item.replyname}}</span>：
                <span class="content">{{item.content}}</span>
                <span class="pubtime">({{item.pubtime}})</span>
            </div>
            <span class="answer_btn" @click="quto(item)">回复</span>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        quto(item) {
            const params = {
                replyname: item.username,
                replycontent: item.content,
                replyemail: item.useremail
            };
            this.$emit('quto', params);
        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';
.bibi_comments_wrap{
    margin-top: 20px;
    li{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        border-top: 1px dashed #eee;
        color: #aaa;
        padding: 10px 0;
    }
}
.block{
    display: inline-block;
    margin: 0 10px;
}
.user_name{
    color: #828d95;
}
.answer_btn{
    cursor: pointer;
}
.content{
    display: inline-block;
    color: @primary_color;
    margin-right: 10px;
}

@media screen and (max-width: 768px) {
    .pubtime{
        display: none;
    }
}
</style>