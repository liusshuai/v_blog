<template>
    <div class="article_detail_page">
        <div class="info_box_wrap">
            <info-box />
            <social-box />
        </div>
        <transition name="slide-fade">
            <div class="article_detail_wrap" v-show="!loading">
                <div class="article_main">
                    <h1 class="article_title">{{data.title || '文章不存在'}}</h1>
                    <div class="article_detail_base_info">
                        <span class="create_time"><i class="icon-create" /><em> {{data.createtime}}</em></span>
                        <span><i class="icon-update" /><em> {{data.pubtime}}</em></span>
                        <span class="archive" v-show="data.channel"
                            @click="goChannel(data.channel.id)">#{{data.channel ? data.channel.name : ''}}#</span>
                        <a href="#comment">跳到评论</a>
                    </div>
                    <div class="article_content">
                        <md-to-html :content="data.content" />
                    </div>
                    <ul class="tags" v-show="tags">
                        <li v-for="tag in tags"
                            :key="tag"><span class="dot"></span>
                            <span>{{tag}}</span>
                        </li>
                    </ul>
                    <div class="next_article">
                        <a class="prev_article_btn" v-show="prev.id"
                            :href="'/article/' + prev.id">
                            <i class="icon-left" />
                            <span>{{prev.title}}</span>
                        </a>
                        <a class="next_article_btn" v-show="next.id"
                            :href="'/article/' + next.id">
                            <span>{{next.title}}</span>
                            <i class="icon-right" />
                        </a>
                    </div>
                </div>
                <div class="like_article_box">
                    <div class="like_btn" @click="likeArticle"
                        :class="isLike ? 'like_btn_a' : 'like_btn_c'">
                        <i class="icon-like" />
                    </div>
                    <p>喜欢({{data.likes}})</p>
                </div>
                <div class="article_comment_box" id="comment">
                    <mess-list :data="comments" :total="commentTotal"
                        @quto="replyComment" @getMore="getMoreComments" />
                    <comment-box :total="commentTotal" @comment="commentArticle"
                        :placeholder="commentText" @cancel="clearReply" />
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import CommentBox from '@/components/commentBox';
import MessList from '@/components/messList';
import MdToHtml from '@/components/mdToHtml';
import InfoBox from '@/components/infoBox';
import SocialBox from '@/components/socialBox';
import { getArticleDetail, getNear, likeArticle } from '@/api/article';
import { getCommentByArticle, addComment } from '@/api/comment';
import { setDocTitle } from '@/util/util';
export default {
    data () {
        return {
            data: {},
            commentPage: 1,
            comments: [],
            commentTotal: 0,
            prev: {},
            next: {},
            commentText: '',
            loading: true,
            isLike: false
        };
    },
    computed: {
        tags() {
            let tags = [];
            if (this.data.tags) {
                tags = JSON.parse(this.data.tags);
            }

            return tags;
        },
        id() {
            return this.$route.params.id;
        }
    },
    mounted () {
        this.getDetail();
        this.getComments();
        this.getNearArticle();
        this.didArticleisLike();
        this.reply = {};
    },
    methods: {
        getDetail() {
            getArticleDetail(this.id).then(res => {
                if (res.code === 200) {
                    this.data = res.data;
                    if (res.data.outurl) {
                        location.href = res.data.outurl;
                        return;
                    }
                    setDocTitle(res.data.title);
                    document.getElementById('description').content = res.data.desc;
                } else {
                    document.title = '文章不存在';
                }

                this.loading = false;
            });
        },
        getComments() {
            getCommentByArticle({
                aid: this.id,
                page: this.commentPage
            }).then(res => {
                if (res.code === 200) {
                    const { list, total } = res.data;
                    this.comments = this.comments.concat(list);
                    this.commentTotal = total;
                }
            });
        },
        getMoreComments() {
            this.commentPage += 1;
            this.getComments();
        },
        getNearArticle() {
            getNear(this.id).then(res => {
                if (res.code === 200) {
                    const { prev, next } = res.data;
                    if (prev) {
                        this.prev = prev;
                    }

                    if (next) {
                        this.next = next;
                    }
                }
            });
        },
        didArticleisLike() {
            const ids = JSON.parse(localStorage.getItem('likeArticleIds') || "[]");

            const i = ids.findIndex(item => item === this.id);

            this.isLike = i > -1;
        },
        likeArticle() {
            if (this.isLike) return;
            likeArticle(this.id).then(res => {
                if (res.code === 200) {
                    const ids = JSON.parse(localStorage.getItem('likeArticleIds') || "[]");
                    ids.push(this.id);
                    localStorage.setItem('likeArticleIds', JSON.stringify(ids));
                    this.data.likes += 1;
                    this.isLike = true;
                }
            });
        },
        commentArticle(params) {
            params = Object.assign({}, params, {
                host: this.id,
                type: 1,
                ...this.reply
            });
            addComment(params).then(res => {
                if (res.code === 200) {
                    this.comments.unshift(params);
                    this.commentTotal += 1;
                    location.href = `/article/${this.id}#comment`;
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
        },
        goChannel(id) {
            this.$router.push(`/archives?type=channel&channel=${id}`);
        }
    },
    components: {
        CommentBox,
        MessList,
        MdToHtml,
        InfoBox,
        SocialBox
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';
.article_detail_page{
    display: flex;
    justify-content: space-between;
}
.article_detail_wrap{
    width: 853px;
}
.article_main{
    .box_common_style;
    padding: 65px 45px 50px;
}
.article_title{
    font-size: 28px;
    margin-bottom: 10px;
    font-weight: normal;
}
.article_detail_base_info{
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-bottom: 50px;
    span{
        display: flex;
        align-items: center;
        margin-right: 16px;
        color: #aaa;
    }
    em{
        margin-left: 4px;
        font-style: normal;
    }
    .archive{
        color: #7594b3;
        cursor: pointer;
    }
}
.article_content{
    padding-bottom: 60px;
}
.tags{
    display: flex;
    font-size: 12px;
    padding-bottom: 30px;
    border-bottom: 1px solid #eee;
    li{
        display: flex;
        align-items: center;
        height: 26px;
        padding: 0 10px 0 5px;
        border-radius: 13px;
        border: 1px solid #000;
        margin-right: 16px;
    }
    span{
        font-size: 12px;
    }
}
.dot{
    display: inline-block;
    width: 4px;
    height: 4px;
    background: @primary_color;
    border-radius: 2px;
    margin-right: 4px;
}
.prev_article_btn,
.next_article_btn{
    display: flex;
    align-items: center;
    cursor: pointer;
}
.prev_article_btn{
    float: left;
}
.next_article_btn{
    float: right;
}
.next_article{
    color: #aaa;
    font-size: 14px;
    margin-top: 20px;
    img{
        width: 16px;
    }
    &:after{
        content:".";        
        display:block;        
        height:0;        
        clear:both;        
        visibility:hidden;   
    }
    a{
        transition: all .2s;
        i{
            font-weight: bold;
        }
        &:hover{
            color: @primary_color;
        }
    }
}
.like_article_box{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 0;
    font-size: 14px;
    color: #555;
    p{
        margin-left: 20px;
    }
}
.like_btn{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    border-radius: 50%;
    line-height: 56px;
    font-size: 26px;
    cursor: pointer;
}
.like_btn_c{
    border: 2px solid #ccc;
    color: #ccc;
}
.like_btn_a{
    border: 2px solid #85b7e2;
    color: #fff;
    background: #85b7e2;
}
.article_comment_box{
    .box_common_style;
}

@media screen and (max-width: 768px) {
    .info_box_wrap{
        display: none;
    }
    .article_detail_wrap{
        width: 100%;
    }
    .article_main,
    .article_comment_box{
        padding: 10px 12px;
    }
    .article_detail_base_info{
        margin-bottom: 20px;
        .create_time{
            display: none;
        }
    }
    .article_content{
        padding-bottom: 0;
    }
}
</style>