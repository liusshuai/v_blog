<template>
    <div class="emoji_wrap">
        <span class="emoji_btn" @click="toggleEmojiMain"><i class="icon-smile2" /></span>
        <transition name="emoji-main">
            <div class="emoji_main" v-show="showMain">
                <ul class="tantan_emoji_list">
                    <li v-for="emoji in emojis" :key="emoji.index" @click="chooseEmoji(emoji.index)">
                        <div class="emoji_content">
                            <img v-lazy="emoji.src" />
                        </div>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
import emoji from '@/assets/js/emoji.js';
export default {
    data() {
        return {
            showMain: false
        };
    },
    created() {
        this.emojis = emoji;
    },
    methods: {
        toggleEmojiMain() {
            this.showMain = !this.showMain;
        },
        chooseEmoji(emojiCode) {
            this.$emit('chooseEmoji', emojiCode);
            this.showMain = false;
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/common.less';
.emoji_wrap{
    position: relative;
    margin-right: 10px;
}
.emoji_btn{
    display: inline-block;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    color: #ccc;
    font-size: 20px;
}
.emoji_main{
    position: absolute;
    top: -304px;
    left: 0;
    min-width: 500px;
    height: 300px;
    .box_common_style(10px);
    border: 2px solid #eee;
    overflow-y: scroll
}
.tantan_emoji_list{
    display: flex;
    flex-wrap: wrap;
    li{
        padding:0 4px;
        margin-bottom: 8px;
        width: 20%;
        height: 90px;
    }
    .emoji_content{
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: 2px;
        &:hover {
            box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 3px 0px;
        }
    }
}

@media screen and (max-width: 768px) {
    .emoji_main{
        min-width: 320px;
    }
    .tantan_emoji_list{
        li{
            height: 45px;
        }
    }
}

.emoji-main-enter-active {
  transition: all .3s ease;
}
.emoji-main-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.emoji-main-enter, .emoji-main-leave-to{
  transform: translateY(100%);
  opacity: 0;
}
</style>