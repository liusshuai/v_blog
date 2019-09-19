<template>
    <div class="loading_box">
        <img src="../assets/images/timg.gif" />
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';
.loading_box{
    width: 200px;
    height: 140px;
    margin: 0 auto;
    margin-top: 80px;
    border-radius: @common_box_radius;
    overflow: hidden;
    box-shadow: @common_box_shadow;
}
</style>