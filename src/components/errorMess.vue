<template>
    <transition name="error-fade">
    <div class="error_mess_wrap" v-show="text">
        <span class="icon-error">
            <i class="path1"></i>
            <i class="path2"></i>
        </span><span> {{text}}</span>
    </div>
    </transition>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="less" scoped>
.error_mess_wrap{
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #ec7571;
    font-weight: bold;
    margin: 10px 0;
    span{
        margin-right: 4px;
    }
}

.error-fade-enter-active {
  transition: all .3s ease;
}
.error-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.error-fade-enter, .error-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>