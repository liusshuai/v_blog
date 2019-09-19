<template>
    <div class="skeleton_wrap">
        <div class="ske_top_one"></div>
        <div class="ske_top_two"></div>
        <div class="ske_middle_one"></div>
        <div class="ske_middle_two"></div>
        <div class="ske_bottom_one"></div>
    </div>
</template>

<style lang="less" scoped>
.skeleton_wrap{
    padding: 20px 10px;
}
.ske_common_style{
    height: 20px;
    border-radius: 6px;
    background: #f2f2f2;
    margin-bottom: 6px;
    animation: skeleton 1s ease infinite;
}
.ske_top_one{
    width: 100px;   
    .ske_common_style;
}
.ske_top_two{
    width: 260px;   
    .ske_common_style;
}
.ske_middle_one{
    width: 90%;   
    .ske_common_style;
}
.ske_middle_two{
    width: 100px;   
    .ske_common_style;
}
.ske_bottom_one{
    width: 200px;   
    .ske_common_style;
}

@keyframes skeleton {
    0% {background: #f2f2f2;}
    50% {background: #e6e6e6;}
    100% {background: #f2f2f2;}
}
</style>