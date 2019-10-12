<template>
    <div class="markdown_html_wrap"
        id="markdown_content" v-html="content"></div>
</template>

<script>
export default {
    props: {
        content: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="less">
</style>