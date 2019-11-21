<template>
    <div class="home_page_wrap">
        <div class="info_box_wrap">
            <info-box />
            <social-box />
        </div>
        <transition name="slide-fade">
            <div v-show="!loading">
                <div class="home_page_main">
                    <skeleton v-if="loading" />
                    <ul class="article_list" v-else>
                        <transition-group name="glide-fade">
                            <li v-for="item in list" :key="item.id">
                                <article-box :data="item" />
                            </li>
                        </transition-group>
                    </ul>
                    <empty v-if="!list.length" text="还没有发布文章" />
                </div>
                <div class="pagination_box">
                    <pagination :curPage="page" :total="total" 
                        @change="pageChange" @prev="prevPage" @next="nextPage" />
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import ArticleBox from '@/components/articleBox';
import Pagination from '@/components/pagination';
import Skeleton from '@/components/skeleton';
import InfoBox from '@/components/infoBox';
import SocialBox from '@/components/socialBox';
import Empty from '@/components/empty';
import { getArticles } from '@/api/article';
export default {
    name: 'home',
    data () {
        return {
            page: 1,
            list: [],
            total: 0,
            info: {},
            loading: true
        }
    },
    mounted () {
        this.getArticle();
    },
    methods: {
        getArticle() {
            getArticles({page: this.page}).then(res => {
                if (res.code === 200) {
                    const { list, total } = res.data;
                    this.list = list;
                    this.total = total;
                }
                this.loading = false;
            });
        },
        prevPage() {
            this.page -= 1;
            this.getArticle();
        },
        nextPage() {
            this.page += 1;
            this.getArticle();
        },
        pageChange(page) {
            this.page = page;
            this.getArticle();
        }
    },
    watch: {
        // $route(to, from) {
        //     //如果to索引大于from索引,判断为前进状态,反之则为后退状态
        //     if(to.meta.index > from.meta.index){
        //         //设置动画名称
        //         this.transitionName = 'slide-left';
        //     }else{
        //         this.transitionName = 'slide-right';
        //     }
        // }
    },
    components: {
        ArticleBox,
        Pagination,
        Skeleton,
        InfoBox,
        SocialBox,
        Empty
    }    
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';
.home_page_wrap{
    display: flex;
    justify-content: space-between;
}
.home_page_main{
    width: 853px;
    .box_common_style;
}
.article_list{
    li{
        border-bottom: 1px solid #eee;
        &:last-child{
            border-bottom: none;
        }
    }
}
.pagination_box{
    text-align: center;
}

@media screen and (max-width: 768px) {
    .home_page_wrap{
        display: block;
    }
    .info_box_wrap{
        display: none;
    }
    .home_page_main{
        width: 100%;
    }
}
</style>