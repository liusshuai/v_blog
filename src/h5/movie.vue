<template>
    <div class="movie_h5_page">
        <div class="movie_base_info">
            <div class="movie_cover">
                <img :src="movie.cover" />
            </div>
            <div class="base_info">
                <h1 class="movie_title">{{movie.name}}</h1>
                <h3 class="movie_type">类型: {{movie.type}}</h3>
                <p>导演: {{movie.director}}</p>
                <p>演员: {{movie.actor}}</p>
                <p>标签: {{movie.tag}}</p>
            </div>
        </div>
        <p class="movie_desc">{{movie.desc}}</p>
        <div class="content_box">
            <md-to-html :content="movie.content" />
        </div>
    </div>
</template>

<script>
import MdToHtml from '@/components/mdToHtml';
import { getDetail } from '@/api/movie';
export default {
    data() {
        return {
            movie: {}
        };
    },
    mounted() {
        this.initDetail();
        document.body.style.background = '#24292c';
        document.getElementById("markdown_content").style.color = '#fff';
    },
    methods: {
        initDetail() {
            const id = this.$route.params.id;
            getDetail(id).then(res => {
                if (res.code === 200) {
                    this.movie = res.data;
                }
            });
        }
    },
    components: {
        MdToHtml
    }
}
</script>

<style lang="less" scoped>
.movie_h5_page{
    color: #fff;
    padding: 20px 10px 10px;
}
.movie_base_info{
    display: flex;
}
.movie_cover{
    width: 140px;
    height: 180px;
    background: #fff;
    overflow: hidden;
    border-radius: 6px;
    flex-shrink: 0;
}
.base_info{
    margin-left: 12px;
    font-size: 14px;
    p{
        margin-bottom: 3px;
    }
}
.movie_title{
    font-size: 16px;
}
.movie_type{
    font-size: 14px;
    font-weight: normal;
    margin: 6px 0;
}
.movie_desc{
    padding: 14px;
    background: #000;
    border-radius: 8px;
    margin: 10px 0;
    font-size: 12px;
}
.content_box{
    margin-top: 20px;
}
</style>