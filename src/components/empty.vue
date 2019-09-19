<template>
    <div class="empty_wrap">
        <img src="../assets/images/want-empty.png" />
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
</style>