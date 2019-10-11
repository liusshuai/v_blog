<template>
    <div class="bibi_box_wrap">
        <div class="bibi_side">
            <div class="bibi_pub_date">
                <p class="day">{{data.date}}</p>
                <p class="month">{{data.month}}月</p>
            </div>
            <p class="bibi_pub_year">{{data.year}}</p>
        </div>
        <div class="bibi_main">
            <div class="bibi_img">
                <img v-if="data.imgs && data.imgs[0]" :src="data.imgs[0].src" />
            </div>
            <p class="bibi_content">{{data.content || '该条行博不存在或被删除'}}</p>
            <div class="bibi_tags">
                <span v-for="tag in data.tags" :key="tag">#{{tag}}#</span>
            </div>
            <div class="bibi_handler" v-show="!detail">
                <a>热度({{data.likenum}})</a>
                <router-link :to="'/bibi/' + data.id">评论({{data.comments}})</router-link>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        detail: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: () => {
                return {};
            }
        }
    }
}
</script>

<style lang="less" scoped>
.bibi_box_wrap{
    display: flex;
    padding: 20px 40px;
}
.bibi_side{
    width: 84px;
    text-align: center;
}
.bibi_pub_year{
    margin-top: 6px;
    font-size: 20px;
    color: #ccc;
    font-weight: 600;
}
.bibi_pub_date{
    border: 3px solid #828d95;
    border-radius: 100%;
    height: 74px;
    width: 74px;
    margin: 0 auto;
    cursor: default;
    color: #828d95;
    .day{
        // margin-top: 4px;
        font-size: 30px;
    }
    .month{
        font-size: 16px;
        font-weight: 600;
    }
}
.bibi_main{
    margin-left: 20px;
    flex-grow: 1;
}
.bibi_content{
    padding: 14px 0 0;
    font-size: 15px;
    color: #737373;
    line-height: 24px;
}
.bibi_img{
    display: block;
    width: 80%;
}
.bibi_tags{
    margin-top: 20px;
    span{
        font-size: 13px;
        display: inline-block;
        margin-right: 20px;
        color: #aaa;
    }
}
.bibi_handler{
    color: #828d95;
    margin-top: 20px;
    font-size: 12px;
    a{
        display: inline-block;
        margin-right: 25px;
    }
}

@media screen and (max-width: 768px) {
    .bibi_box_wrap{
        padding: 6px;
    }
    .bibi_side{
        width: 50px;
    }
    .bibi_pub_date{
        border-width: 2px;
        height: 44px;
        width: 44px;
        .day{
            font-weight: bold;
            font-size: 11px;
        }
        .month{
            font-size: 12px;
        }
    }

    .bibi_pub_year{
        margin-top: 2px;
        font-size: 12px;
    }
    .bibi_main{
        margin-left: 10px;
    }
    .bibi_img{
        width: 100%;
    }
    .bibi_content{
        padding: 0;
        line-height: 20px;
        font-size: 14px;
    }
    .bibi_tags{
        margin-top: 4px;
        span{
            font-size: 12px;
        }
    }
    .bibi_handler{
        margin-top: 6px;
    }
}
</style>