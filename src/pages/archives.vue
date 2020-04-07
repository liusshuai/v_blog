<template>
    <transition name="glide-fade">
        <div class="archive_wrap" v-show="!loading">
            <div class="archive_title">
                <i class="icon-archive" /> 文章归档（{{articlesCount}}）
            </div>
            <div class="archive_main">
                <div class="sorl_filter">
                    <ul class="archive_sort">
                        <li @click="getAllArticle"><span>全部</span><span>({{articlesCount}})</span></li>
                        <li v-for="c in channel" :key="c.id"
                            @click="getByChannel(c.id)">
                            <span>{{c.cname}}</span><span>({{c.articlecount}})</span>
                        </li>
                    </ul>
                    <h4 class="tags_title">标签</h4>
                    <ul class="filter_tags">
                        <li v-for="tag in tags" :key="tag"
                            @click="getByTag(tag)">
                            {{tag}}
                        </li>
                    </ul>
                </div>
                <ul class="article_list" v-if="articleSubs.length">
                    <transition-group name="article-fade">
                    <li v-for="sub in articleSubs" :key="sub.date">
                        <p class="pub_time">{{sub.date}} / {{sub.article.length}}篇文章</p>
                        <ul class="title_list">
                            <li v-for="a in sub.article"
                                @click="gotoArticle(a.id)" :key="a.id">
                                {{a.date}} {{a.title}}
                            </li>
                        </ul>
                    </li>
                    </transition-group>
                </ul>
                <empty v-else />
            </div>
        </div>
    </transition>
</template>

<script>
import { getArchive } from '@/api/channel';
import { getArticleByChannel, getArticleByTag, getArticles, getArticleByQ } from '@/api/article';
import Empty from '@/components/empty';
import { setDocTitle } from '@/util/util';
export default {
    data () {
        return {
            channel: [],
            tags: [],
            articlesCount: 0,
            articleSubs: [],
            loading: true
        };
    },
    mounted() {
        setDocTitle('归档-刘帅的个人博客');
        this.getAllChannel();
        const type = this.$route.query.type;
        switch (type) {
            case 'channel':
                this.getByChannel(this.$route.query.channel);
                break;
            case 'tag':
                this.getByTag(this.$route.query.tag);
                break;
            case 'search':
                this.getByKeyword();
                break;
            default:
                break;
        }
    },
    methods: {
        getAllChannel() {
            getArchive().then(res => {
                if (res.code === 200) {
                    const {articles, channels, tags} = res.data;
                    this.channel = channels;
                    this.tags = tags;
                    this.articlesCount = articles.length;
                    this.initArticles(articles);
                }

                this.loading = false;
            });
        },
        initArticles(list) {
            let _articleSubs = [];
            list.forEach(a => {
                const date = new Date(a.pubtime.replace(/-/g, '/'));
                const dateStr = date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
                const i = _articleSubs.findIndex(item => item.date === dateStr);
                
                a.date = (date.getMonth() + 1) + '-' + date.getDate();

                if (i > -1) {
                    _articleSubs[i].article.push(a);
                } else {
                    _articleSubs.push({
                        date: dateStr,
                        article: [a]
                    });
                }
            });
            this.articleSubs = _articleSubs;
        },
        getAllArticle() {
            getArticles({limit: 1000}).then(res => {
                if (res.code === 200) {
                    this.initArticles(res.data.list);
                }

                this.loading = false;
            });
        },
        getByChannel(id) {
            getArticleByChannel(id).then(res => {
                if (res.code === 200) {
                    this.initArticles(res.data);
                }

                this.loading = false;
            });
        },
        getByTag(tag) {
            getArticleByTag(tag).then(res => {
                if (res.code === 200) {
                    this.initArticles(res.data);
                }

                this.loading = false;
            });
        },
        getByKeyword() {
            const q = this.$route.query.q;
            getArticleByQ(q).then(res => {
                if (res.code === 200) {
                    this.initArticles(res.data.list);
                }

                this.loading = false;
            });
        },
        gotoArticle(id) {
            this.$router.push(`/article/${id}`);
        }
    },
    components: {
        Empty
    },
    watch: {
        $route(to, from) {
            if (to.query.q !== from.query.q) {
                if (to.query.type === 'search') {
                    this.getByKeyword();
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';
.archive_wrap{
    width: 100%;
    background: #fff;
    border-radius: @common_box_radius;
    padding: 20px;
    box-shadow: @common_box_shadow;
    li{
        cursor: pointer;
    }
}
.archive_main{
    display: flex;
}
.archive_title{
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
}
.sorl_filter{
    flex-shrink: 0;
    width: 240px;
    padding-right: 20px;
    border-right: 1px solid #eee;
}
.archive_sort{
    color: #7594b3;
    font-size: 15px;
    li{
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        transition: all .4s;
        &:hover{
            color: @primary_color;
        }
    }
}
.tags_title{
    font-size: 13px;
    font-weight: bold;
    margin-top: 40px;
}
.filter_tags{
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
    margin-top: 10px;
    li{
        padding: 4px 0;
        border-bottom: 1px dashed #eee;
        margin-right: 8px;
        transition: all .4s;
        &:hover{
            border-bottom: 1px dashed @primary_color;
        }
    }
}
.classify_title{
    font-size: 16px;
}
.article_list{
    padding: 20px;
    li{
        margin-bottom: 10px;
    }
}
.pub_time{
    font-size: 16px;
    font-weight: normal;
    color: #000;
}
.title_list{
    display: flex;
    flex-wrap: wrap;
    li{
        margin-right: 35px;
        height: 45px;
        line-height: 45px;
        color: #666;
        font-size: 16px;
        border-bottom: 1px dashed #ddd;
        transition: all .4s;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:hover{
            border-bottom: 1px dashed @primary_color;
        }
    }
}

.glide-fade-enter-active {
  transition: all .3s ease-in;
}

.glide-fade-enter {
  transform: translateY(10px);
  opacity: 0;
}

@media screen and (max-width: 768px) {
    .archive_main{
        display: block;
    }

    .sorl_filter{
        width: 100%;
        border-right: none;
    }
    .tags_title{
        margin-top: 20px;
    }
    .article_list{
        padding: 0;
        margin-top: 30px;
    }
    .pub_time{
        font-size: 13px;
    }
    .title_list{
        li{
            height: 36px;
            line-height: 36px;
            font-size: 16px;
            margin-right: 15px;
        }
    }
}
</style>