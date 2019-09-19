<template>
    <div class="pagination_wrap" v-show="total > 0">
        <span :class="curPage === 1 ? 'disable_item' : ''"
            @click="prev">上一页</span>
        <span class="page_item" :class="curPage === page ? 'active_item' : ''"
            v-for="page in pages" :key="page" @click="pageChange(page)">
            {{page}}
        </span>
        <span :class="curPage === pages ? 'disable_item' : ''"
            @click="next">下一页</span>
    </div>
</template>

<script>
export default {
    props: {
        curPage: {
            type: Number,
            default: 1
        },
        total: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 5
        }
    },
    computed: {
        pages() {
            return Math.ceil(this.total / this.pageSize);
        }
    },
    methods: {
        prev() {
            if (this.curPage === 1) return;
            this.$emit('prev');
        },
        next() {
            if (this.curPage === this.pages) return;
            this.$emit('next');
        },
        pageChange(page) {
            this.$emit('change', page);
        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';
.pagination_wrap{
    font-size: 14px;
    margin-top: 20px;
    span{
        display: inline-block;
        margin: 0 6px;
        cursor: pointer;
    }
    .disable_item{
        color: #aaa;
        cursor: not-allowed;
    }
}
.page_item{
    padding: 4px 10px;
    border: 1px solid @primary_color;
    border-radius: 4px;
    transition: all .4s;
    &:hover{
        .active_item;
    }
}
.active_item{
    color: #fff;
    background: @primary_color;
}
</style>