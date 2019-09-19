<template>
    <div class="bibi_wrap">
        <div class="img_cover">
            <h2 class="title">够钟</h2>
            <p>何事落到这收场，枯死在你的手上，风花月似戏一场，遗容任你瞻仰。</p>
        </div>
        <ul>
            <transition-group name="glide-fade">
            <li class="bibi_box" v-for="item in list" :key="item.id">
                <bibi-box :data="item" />
            </li>
            </transition-group>
        </ul>
        <div class="get_more_btn" v-show="total > list.length">
            <more-btn text="加载更多" />
        </div>
    </div>
</template>

<script>
import BibiBox from '@/components/bibiBox';
import MoreBtn from '@/components/lButton';
import Empty from '@/components/empty';
import { getBibis } from '@/api/bibi';
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
        this.getBibiList();
    },
    methods: {
        getBibiList() {
            getBibis({page: this.page}).then(res => {
                if (res.code === 200) {
                    const { data, total } = res.data;
                    this.total = total;
                    this.list = data.map(item => {
                        const day = new Date(item.pubtime);
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
                    });
                }

                this.loading = false;
            });
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
    background: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567782156665&di=72aabd71106b15f3af970d15a28d4a00&imgtype=0&src=http%3A%2F%2Fd.5857.com%2Fzb_161130%2F002.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: 133px;
    text-align: center;
    h2{
        font-weight: 200;
        font-size: 30px;
    }
    p{
        font-size: 15px;
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
</style>