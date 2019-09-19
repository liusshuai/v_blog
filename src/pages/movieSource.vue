<template>
    <transition name="glide-fade">
    <div class="source_wrap" v-show="!loading">
        <div class="search_box">
            <input v-model="key" placeholder="输入你想查找的资源" @keyup.enter="getList" />
            <span class="search_btn" @click="getList">搜搜</span>
        </div>
        <p class="intro">一些自己看过的电影和美剧，做一下收集和分享，不定时更新，分享链接全是百度网盘，有需要请自行保存。</p>
        <ul class="source_list">
            <li v-for="m in movies" :key="m.id">
                <div @click="goToDetail(m.id)" class="source_item_wrap">
                    <img :src="m.cover" />
                    <p class="base_info">{{m.name}}({{m.type}}/{{m.tag}})</p>
                </div>
            </li>
        </ul>
        <div class="pagination_box">
            <pagination :curPage="page" :total="total" :pageSize="20"
                @change="pageChange" @prev="prevPage" @next="nextPage" />
        </div>
    </div>
    </transition>
</template>

<script>
import Pagination from '@/components/pagination';
import { getMovies } from '@/api/movie';
export default {
    data() {
        return {
            page: 1,
            key: '',
            movies: [],
            total: 0,
            loading: true
        };
    },
    mounted() {
        this.getList();
    },
    methods: {
        getList() {
            getMovies({
                page: this.page,
                key: this.key
            }).then(res => {
                if (res.code === 200) {
                    const { list, total } = res.data;

                    this.movies = list;
                    this.total = total;
                }

                this.loading = false;
            });
        },
        goToDetail(id) {
            this.$router.push('/movie/' + id);
        },
        pageChange(page) {
            this.page = page;
            this.getList();
        },
        prevPage() {
            this.page -= 1;
            this.getList();
        },
        nextPage() {
            this.page += 1;
            this.getList();
        }
    },
    components: {
        Pagination
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';
.source_wrap{
    width: 100%;
    .box_common_style;
}
.search_box{
    display: flex;
    align-items: center;
    width: 400px;
    height: 40px;
    border: 1px solid @primary_color;
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 20px;
    overflow: hidden;
    padding: 0 20px;
    input{
        flex-grow: 1;
        outline: none;
    }
    span{
        display: block;
        margin-left: 10px;
        cursor: pointer;
    }
}
.source_list{
    display: flex;
    flex-wrap: wrap;
    li{
        width: 20%;
        padding: 0 10px;
        margin-bottom: 20px;
        div, img{
            width: 100%;
        }
    }
}
.source_item_wrap{
    position: relative;
    border: 1px solid #e3e8ec;
    height: 300px;
    overflow: hidden;
    cursor: pointer;
}

.base_info{
    position: absolute;
    width: 100%;
    bottom: 2px;
    left: 2px;
    font-size: 14px;
    padding: 4px;
    color: #fff;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
}
.intro{
    font-size: 13px;
    color: grey;
    margin: 40px 0;
}
.pagination_box{
    text-align: center;
}

.glide-fade-enter-active {
  transition: all .3s ease-in;
}

.glide-fade-enter {
  transform: translateY(-10px);
  opacity: 0;
}
</style>