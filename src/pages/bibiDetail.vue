<template>
    <transition name="glide-fade">
    <div class="bibi_detail_wrap" v-show="!loading">
        <bibi-box :detail="true" :data="data">
            <div>
                <div class="base_line"></div>
                <div class="comment_box" id="comment">
                    <comment-box :total="total" @comment="commentBibi"
                        :placeholder="commentText" @cancel="clearReply" />
                    <bibi-comments :data="comments" @quto="replyComment" />
                    <p class="get_more_btn" v-show="total > comments.length">
                        <span @clic="getMoreComments">加载更多</span>
                    </p>
                </div>
            </div>
        </bibi-box>
    </div>
    </transition>
</template>

<script>
import BibiBox from '@/components/bibiBox';
import BibiComments from '@/components/bibiComments';
import CommentBox from '@/components/commentBox';
import { getBibiDetail } from '@/api/bibi';
import { getCommentByBibi, addComment } from '@/api/comment';
export default {
    data() {
        return {
            page: 1,
            data: {},
            comments: [],
            total: 0,
            commentText: '',
            loading: true
        };
    },
    mounted() {
        this.getDetail();
        this.getComments();

        this.reply = {};
    },
    computed: {
        id () {
            return this.$route.params.id;
        }
    },
    methods: {
        getDetail() {
            getBibiDetail(this.id).then(res => {
                if (res.code === 200) {
                    const item = res.data;
                    const day = new Date(item.pubtime);
                    item.year = day.getFullYear();
                    item.month = day.getMonth() + 1;
                    item.date = day.getDate();
                    if (item.date < 10) {
                        item.date = '0' + item.date;
                    }
                    if (item.fromw) {
                        item.tags = JSON.parse(item.fromw);
                    }

                    this.data = item;

                    this.loading = false;
                }
            });
        },
        getComments() {
            getCommentByBibi({
                page: this.page,
                tid: this.id
            }).then(res => {
                if (res.code === 200) {
                    const { list, total } = res.data;
                    this.comments = this.comments.concat(list);
                    this.total = total;
                }
            });
        },
        getMoreComments() {
            this.page += 1;
            this.getComments();
        },
        commentBibi(params) {
            params = Object.assign({}, params, {
                host: this.id,
                type: 2,
                ...this.reply
            });
            addComment(params).then(res => {
                if (res.code === 200) {
                    this.comments.unshift({
                        ...params,
                        pubtime: '刚刚'
                    });
                    this.total += 1;
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
        BibiBox,
        CommentBox,
        BibiComments
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';
.bibi_detail_wrap{
    width: 853px;
    .box_common_style;
    margin: 0 auto;
}
.base_line{
    width: 100%;
    border-top: 1px solid #eee;
    margin-top: 20px;
}
.get_more_btn{
    text-align: center;
    font-size: 13px;
    margin-top: 10px;
    span{
        cursor: pointer;
        &:hover{
            border-bottom: 1px dashed @primary_color;
        }
    }
}

@media screen and (max-width: 768px) {
    .bibi_detail_wrap{
        width: 100%;
    }
}
</style>