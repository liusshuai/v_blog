<template>
    <div class="bibi_wrap">
        <div class="img_cover">
            <h2 class="title">够钟</h2>
            <p>其实你认识的大部分人，你们已经见过最后一面了。</p>
        </div>
        <ul>
            <transition-group name="glide-fade">
            <li class="bibi_box" v-for="item in list" :key="item.id">
                <bibi-box :data="item" />
            </li>
            </transition-group>
            <empty v-if="!list.length" text="还没有新行博" />
        </ul>
        <div class="get_more_btn" v-show="total > list.length">
            <more-btn text="加载更多" @onClick="getMore" />
        </div>
    </div>
</template> 

<script>
import BibiBox from '@/components/bibiBox';
import MoreBtn from '@/components/lButton';
import Empty from '@/components/empty';
import { getBibis } from '@/api/bibi';
import { setDocTitle } from '@/util/util';
export default {
    data () {
        return {
            page: 1,
            list: [],
            total: 0,
            loading: true
        };
    },
    mounted () {
        setDocTitle('Bibi-刘帅的个人博客');
        this.getBibiList();
    },
    methods: {
        getBibiList(page = this.page) {
            getBibis({page}).then(res => {
                if (res.code === 200) {
                    const { data, total } = res.data;
                    this.total = total;
                    this.list = this.list.concat(data.map(item => {
                        const day = new Date(item.pubtime.replace(/-/g, '/'));
                        item.year = day.getFullYear();
                        item.month = day.getMonth() + 1;
                        item.date = day.getDate();
                        if (item.date < 10) {
                            item.date = '0' + item.date;
                        }
                        if (item.fromw) {
                            item.tags = JSON.parse(item.fromw);
                        }

                        return item;
                    }));
                }

                this.loading = false;
            });
        },
        getMore() {
            this.getBibiList(++this.page);
        }
    },
    components: {
        BibiBox,
        MoreBtn,
        Empty
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';
.bibi_wrap{
    width: 853px;
    margin: 0 auto;
}
.img_cover{
    .box_common_style(0);
    color: #fff;
    width: 100%;
    height: 350px;
    background: url('http://www.lsshuai.com/static/images/bibibg.jpg') center bottom;
    // background-repeat: no-repeat;
    background-size: cover;
    padding-top: 133px;
    text-align: center;
    h2{
        font-weight: 200;
        font-size: 30px;
    }
    p{
        font-size: 17px;
        margin-top: 20px;
    }
}
.bibi_box{
    margin-top: 20px;
    .box_common_style;
}
.get_more_btn{
    margin-top: 20px;
    text-align: center;
}

@media screen and (max-width: 768px) {
    .bibi_wrap{
        width: 100%;
    }
    .img_cover{
        border-radius: 0;
        margin-top: -10px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .bibi_box{
        padding: 10px;
    }
}
</style>