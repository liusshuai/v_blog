<template>
    <div class="article_wrap">
        <div v-if="data.cover && data.coverpos === 1"
            v-lazy:background-image="data.cover"
            class="article_side_cover" style="margin-right: 20px"></div>
        <div class="article_main">
            <div :class="data.cover && data.coverpos === 0 ? 'article_top_cover' : ''"
                :style="data.cover && data.coverpos === 0
                    ? `background: url(${data.cover}) center center; background-size: cover` : ''">
                <h1 class="title">
                    <router-link v-if="!data.outurl" :to="'/article/' + data.id">{{data.title}}</router-link>
                    <a v-else :href="data.outurl" target="_blank">{{data.title}}</a>
                </h1>
                <div class="base_info">
                    <div class="time create_time">
                        <i class="icon-create" /> 
                        <span>{{data.createtime}}</span>
                    </div>
                    <div class="time">
                        <i class="icon-update" /> 
                        <span>{{data.pubtime}}</span>
                    </div>
                    <div class="classify" @click="goChannel(data.channel.id)">#{{data.channel.name}}#</div>
                </div>   
            </div>
            <p class="desc">
                {{data.desc}}
            </p>
            <div class="data_info">
                <div class="tag_list">
                    <i class="icon-tag tag_icon"></i>
                    <span class="tag" v-for="tag in JSON.parse(data.tags)"
                        :key="tag" @click="goToArchive(tag)">{{tag}}</span>
                </div>
                <div class="handle_base">
                    <span>阅读({{data.views}})</span>
                    <span>评论({{data.comments}})</span>
                    <router-link v-if="!data.outurl" :to="'/article/' + data.id">全文»</router-link>
                    <a v-else :href="data.outurl" target="_blank">全文»</a>
                </div>
            </div>
        </div>
        <div v-if="data.cover && data.coverpos === 2"
            v-lazy:background-image="data.cover"
            class="article_side_cover" style="margin-left: 20px"></div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        goChannel(id) {
            this.$router.push(`/archives?type=channel&channel=${id}`);
        },
        goToArchive(tag) {
            this.$router.push(`/archives?type=tag&tag=${tag}`);
        }
    }
}
</script>

<style lang="less" scoped>
.article_wrap{
    display: flex;
    align-items: flex-start;
    padding: 20px 10px;
}
.article_main{
    flex-grow: 1;
}
.title{
    font-size: 23px;
    font-weight: normal;
    margin-bottom: 13px;
    a{
        color: #333;
    }
}
.base_info{
    display: flex;
    font-size: 12px;
    color: #aaa;
}
.article_top_cover{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
    height: 200px;
    border-radius: 8px;
    background-position: center center;
    background-size: cover;
    a, .base_info{
        color: #fff;
    }
}
.article_side_cover{
    flex-shrink: 0;
    width: 160px;
    height: 160px;
    border-radius: 8px;
    background-position: center center;
    background-size: cover;
}
.time{
    display: flex;
    align-items: center;
    margin-right: 20px;
    i{
        font-size: 16px;
        margin-right: 4px;
    }
}
.classify{
    color: #7594b3;
    cursor: pointer;
}
.desc{
    margin: 26px 0;
}
.data_info{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #aaa;
    span{
        margin-right: 6px;
    }
    .tag{
        margin-right: 21px;
        white-space: nowrap;
        cursor: pointer;
    }
}
.tag_list{
    display: flex;
    align-items: center;
}
.tag_icon{
    width: 16px;
}
.handle_base{
    span{
        display: inline-block;
        margin-right: 21px;
    }
}

@media screen and (max-width: 768px) {
    .article_wrap{
        padding: 20px 0;
    }
    .create_time{
        display: none;
    }
    .title{
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 10px;
    }
    .desc{
        font-size: 15px;
        margin: 16px 0;
    }
    .tag_list{
        display: none;
    }
    .data_info{
        justify-content: flex-end;
    }
}
</style>