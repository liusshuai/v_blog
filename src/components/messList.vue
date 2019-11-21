<template>
<div class="mess_list_wrap">
    <ul class="board_list">
        <li v-for="(item, index) in data" :key="item.id">
            <div class="author_info">
                <div class="pub_info">
                    <a class="author_name" :href="item.userblog" target="_blank"
                        v-if="item.userblog">{{item.username}}</a>
                    <span class="author_name" v-else>{{item.username}}</span>
                    <span class="pub_time">{{item.pubtime}}</span>
                </div>
                <div class="base_info">
                    <span class="quto_btn" @click="qutoComment(item)">
                        <a href="#commentBox">引用</a>
                    </span>
                    <span class="floor_text">{{total - index}}楼</span>
                </div>
            </div>
            <div class="content">
                <blockquote v-show="item.replycontent">
                    <pre>引用 {{item.replyname}} 的发言</pre>
                    {{item.replycontent}}
                </blockquote>
                <pre class="content_origin" v-html="parseContent(item.content)"></pre>
            </div>
        </li>
    </ul>
    <div class="get_more_btn" v-show="total > data.length">
        <more-btn text="查看更多" @onClick="this.handleGetMore" />
    </div>
</div>
</template>

<script>
import MoreBtn from '@/components/lButton';
import emojis from '@/assets/js/emoji.js';
import { safeHtml } from '@/util/util.js';
export default {
    props: {
        data: {
            type: Array,
            default: () => []
        },
        total: {
            type: Number,
            default: 0
        }
    },
    methods: {
        qutoComment(item) {
            const params = {
                replyname: item.username,
                replycontent: item.content,
                replyemail: item.useremail
            };

            this.$emit('quto', params);
        },
        handleGetMore() {
            this.$emit('getMore');
        },
        parseContent(str) {
            let regex = /\[\/(.+?)\]/g;
            let emojiArr = str.match(regex);

            str = safeHtml(str);

            if (emojiArr) {
                let emojiImgList = [];

                emojiArr.forEach(e => {
                    const index = emojis.findIndex(item => item.index === e);   
                    if (index > -1) {
                        emojiImgList.push(emojis[index].src);
                    } else {
                        emojiImgList.push(e);
                    }
                });

                emojiArr.forEach((e, index) => {
                    let regex = /\[\/(.+?)\]/;
                    if (!regex.test(emojiImgList[index])) {
                        str = str.replace(e, `<img style="width: 100px; height: 100px;" src=${emojiImgList[index]} />`);
                    }
                });
            }
            
            return str;    
        }
    },
    components: {
        MoreBtn
    }
}
</script>

<style lang="less" scoped>
.board_list{
    li{
        padding: 20px 0 22px;
        border-bottom: 1px dashed #eee;
        &:last-child{
            border: none;
        }
        blockquote{
            display: block;
            font-size: 12px;
            margin-bottom: 10px;
            border-left: 3px solid #eee;
            background-color: #f8f8f8;
            padding: 10px 14px;
            pre{
                font-weight: bold;
                margin-bottom: 7px;
            }
        }

        &:hover{
            .base_info > .quto_btn{
                display: inline-block;
            }
        }
    }
}
.author_info{
    display: flex;
    justify-content: space-between;
    a{
        color: #24292c;
        padding-bottom: 4px;
        &:hover{
            border-bottom: 1px dashed #24292c;
        }
    }
}
.content{
    padding: 10px 100px 10px 0;
}
.pub_time{
    color: #aaa;
    font-size: 13px;
    margin-left: 10px;
}
.base_info{
    font-size: 14px;
    color: #aaa;
    margin-bottom: 0;
    span{
        // display: inline-block;
        margin-left: 10px;
    }
    .quto_btn{
        display: none;
        border-bottom: 1px dashed #aaa;
        cursor: pointer;
    }
}
.get_more_btn{
    text-align: center;
    cursor: pointer;
}
.content_origin{
    white-space: pre-wrap;
    font-size: 15px;
    line-height: 22px;
}
@media screen and (max-width: 768px) {
    .board_list{
        li{
            padding: 10px 0 11px;
        }
    }
    .content{
        font-size: 14px;
        padding: 10px 10px 10px 0;
    }
    .base_info > .quto_btn{
        display: inline-block;
    }
}
</style>