<template>
    <div class="empty_wrap">
        <div class="empty_image_box"></div>
        <p>💔 {{text}}</p>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: '咩都冇~'
        }
    }
}
</script>

<style lang="less" scoped>
.empty_wrap{
    width: 100%;
    text-align: center;
    padding: 40px;
    img{
        width: 100px;
    }
    p{
        font-size: 16px;
        color: #cccccc;
        margin-top: 4px;
    }
}
.empty_image_box{
    width: 100px;
    height: 100px;
    background: url('../assets/images/want-empty.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0 auto;
}
</style>