<template>
<transition name="glide-fade">
    <div class="source_detail_wrap" v-show="!loading">
        <div class="source_info">
            <div class="source_cover">
                <img :src="movie.cover" />
            </div>
            <div class="base_info">
                <h2 class="title">{{movie.name}}（{{movie.type}}）</h2>
                <p><span>类型：</span>{{movie.tag}}</p>
                <p><span>导演：</span>{{movie.director}}</p>
                <p><span>演员：</span>{{movie.actor}}</p>
                <p class="desc">{{movie.desc}}</p>
            </div>
        </div>
        <div class="content_box">
            <md-to-html :content="movie.content" />
        </div>
        <div class="comment_box" id="comment">
            <mess-list :data="comments" :total="commentTotal" @quto="replyComment" />
            <comment-box :total="commentTotal" @comment="commentMovie" 
            :placeholder="commentText" @cancel="clearReply" />
        </div>
    </div>
</transition>
</template>

<script>
import CommentBox from '@/components/commentBox';
import MessList from '@/components/messList';
import MdToHtml from '@/components/mdToHtml';
import { getDetail } from '@/api/movie';
import { getCommentByMovie, addComment } from '@/api/comment';
export default {
    data() {
        return {
            commentPage: 1,
            commentTotal: 0,
            comments: [],
            movie: {},
            commentText: '',
            loading: true
        };
    },
    computed: {
        id () {
            return this.$route.params.id;
        }
    },
    mounted() {
        this.initDetail();
        this.getComments();
        this.reply = {};
    },
    methods: {
        initDetail() {
            getDetail(this.id).then(res => {
                if (res.code === 200) {
                    this.movie = res.data;
                }

                this.loading = false;
            });
        },
        getComments() {
            getCommentByMovie({
                page: this.commentPage,
                mid: this.id
            }).then(res => {
                if (res.code === 200) {
                    const { list, total } = res.data;

                    this.comments = list;
                    this.commentTotal = total;
                }
            })
        },
        commentMovie(params) {
            params = Object.assign({}, params, {
                host: this.id,
                type: 4,
                ...this.reply
            });
            addComment(params).then(res => {
                if (res.code === 200) {
                    this.comments.unshift(params);
                    this.commentTotal += 1;

                    location.href = `/movie/${this.id}#comment`;
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
        CommentBox,
        MessList,
        MdToHtml
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';
.source_detail_wrap{
    width: 853px;
    .box_common_style;
    margin: 0 auto;
}
.source_cover{
    width: 200px;
    margin-right: 20px;
    flex-shrink: 0;
    img{
        width: 100%;
    }
}
.source_info{
    display: flex;
    // align-items: center;
}
.title{
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 30px;
}
.desc{
    font-size: 14px;
    margin-top: 20px;
}
.cut_images_item{
    margin-top: 10px;
}
.comment_box{
    margin-top: 20px;
    border-top: 1px solid #eee;
}
</style>