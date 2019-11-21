<template>
    <div class="h5_page_container">
        <div class="article_detail_base_info">
            <span class="create_time"><i class="icon-create" /><em> {{data.createtime}}</em></span>
            <span><i class="icon-update" /><em> {{data.pubtime}}</em></span>
        </div>
        <div class="article_content">
            <md-to-html :content="data.content" />
        </div>
    </div>
</template>

<script>
import MdToHtml from '@/components/mdToHtml';
import { getArticleDetail } from '@/api/article';
export default {
    data() {
        return {
            data: {}
        };
    },
    mounted() {
        this.getDetail();
    },
    methods: {
        getDetail() {
            const id = this.$route.params.id;
            getArticleDetail(id).then(res => {
                if (res.code === 200) {
                    this.data = res.data;
                }
            });
        }
    },
    components: {
        MdToHtml
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';

.article_detail_base_info{
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-bottom: 20px;
    span{
        display: flex;
        align-items: center;
        margin-right: 16px;
        color: #aaa;
    }
    em{
        margin-left: 4px;
        font-style: normal;
    }
    i{
        font-size: 16px;
    }
}
</style>