<template>
    <div class="board_page_wrap">
        <div class="info_box_wrap">
            <info-box />
            <social-box />
        </div>
        <transition name="slide-fade">
            <div class="board_wrap" v-show="!loading">
                <div class="board_title" id="comment"><i class="icon-board" /> 留言板({{total}})</div>
                <mess-list v-if="mess.length" :data="mess" :total="total"
                    @quto="replyComment" @getMore="getMoreMess" />
                <empty v-else text="仲有冇留言，你嚟抢梳化啦！" />
                <comment-box title="留言" @comment="leaveMess"
                    :placeholder="commentText" @cancel="clearReply" />
            </div>
        </transition>
    </div>
</template>

<script>
import MessList from '@/components/messList';
import CommentBox from '@/components/commentBox';
import SocialBox from '@/components/socialBox';
import Empty from '@/components/empty';
import InfoBox from '@/components/infoBox';
import { getCommentByBoard, addComment } from '@/api/comment';
import { setDocTitle } from '@/util/util';
export default {
    data() {
        return {
            page: 1,
            mess: [],
            total: 0,
            commentText: '',
            loading: true
        };
    },
    mounted() {
        setDocTitle('留言板-刘帅的个人博客');
        this.getBoards();

        this.reply = {};
    },
    methods: {
        getBoards() {
            getCommentByBoard({
                page: this.page
            }).then(res => {
                if (res.code === 200) {
                    const { list, total } = res.data;

                    this.mess = this.mess.concat(list);
                    this.total = total;
                }

                this.loading = false;
            });
        },
        getMoreMess() {
            this.page += 1;
            this.getBoards();
        },
        leaveMess(params) {
            params = Object.assign({}, params, {
                host: 0,
                type: 3,
                ...this.reply
            });
            addComment(params).then(res => {
                if (res.code === 200) {
                    this.mess.unshift(params);
                    this.total += 1;
                    location.href = `/board#comment`;
                }

                this.clearReply();
            });
        },
        replyComment(params) {
            this.reply = params;
            this.commentText = `回复 ${params.replyname} 的留言`;
        },
        clearReply() {
            this.reply = {};
            this.commentText = '';
        }
    },
    components: {
        MessList, 
        CommentBox,
        Empty,
        InfoBox,
        SocialBox
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';
.board_page_wrap{
    display: flex;
    justify-content: space-between;
}
.board_wrap{
    width: 853px;
    .box_common_style;
}
.board_title{
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
}

@media screen and (max-width: 768px) {
    .board_page_wrap{
        display: block;
    }
    .info_box_wrap{
        display: none;
    }
    .board_wrap{
        width: 100%;
    }
}
</style>