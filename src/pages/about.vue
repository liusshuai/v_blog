<template>
<div class="about_page_wrap">
    <div class="info_box_wrap">
        <info-box />
        <social-box />
    </div>
    <transition name="slide-fade">
        <div class="about_wrap" v-show="!loading">
            <div class="about_title">
                <i class="icon-about" /> 关于我
            </div>
            <div class="main">
                <p class="simple_intro">
                    <span>刘帅</span>，重庆人，2019年7月毕业于广东工业大学，如今在<span>蘑菇街</span>任职前端开发工程师。
                </p>
                <p class="simple_intro">闷骚运动男、非典型话痨、纠结症患者。</p>
                <p class="simple_intro">工作认真、踏实，追求把细节做到极致，因为热爱，所以认真。</p>

                <div class="experience">
                    <h1>工作经历 👣</h1>
                    <div class="work_exp_item">
                        <h2>广州旗风堂信息科技有限公司<span class="work_date">(2017.5 - 2017.11)</span></h2>
                        <p class="work_post">web前端开发</p>
                        <ul class="work_list">
                            <li>vivo公司618、818、教师节活动页面</li>
                            <li>温碧泉活动页面</li>
                            <li>微信读书的小程序开发及维护</li>
                        </ul>
                    </div>
                    <div class="work_exp_item">
                        <h2>蘑菇街<span class="work_date">(2018.7 - 2019.3)</span></h2>
                        <p class="work_post">web前端开发</p>
                        <ul class="work_list">
                            <li>蘑菇街小程序方的业务</li>
                            <li>公司一些后台管理系统的开发</li>
                            <li>自主开发一款自动识别注释生成文档的工具</li>
                            <li>......</li>
                        </ul>
                        <p class="work_post">毕业后在蘑菇街转正入职</p>
                    </div>
                </div>
                <div class="other_info">
                    <h1>其他 💎</h1>
                    <p><span class="label">联系地址</span>浙江省杭州市西湖区古荡街道古墩路99号浙商财富中心A幢</p>
                    <p><span class="label">工作QQ</span>153074457</p>
                    <p><span class="label">邮箱</span><a href="mailto:yigehaoren_Gdoer@163.com">yigehaoren_Gdoer@163.com</a></p>
                    <p><span class="label">网易云音乐</span><a target="_blank" href="https://music.163.com/#/artist?id=33125576">aniu</a></p>
                    <p><span class="label">唱吧</span><a target="_blank" href="http://changba.com/u/115721394">aniu、</a></p>
                </div>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import InfoBox from '@/components/infoBox';
import SocialBox from '@/components/socialBox';
import { setDocTitle } from '@/util/util';
export default {
    data() {
        return {
            loading: true
        };
    },
    mounted() {
        setDocTitle('关于-刘帅的个人博客');
        this.loading = false;
    },
    components: {
        InfoBox,
        SocialBox
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';
.about_page_wrap{
    display: flex;
    justify-content: space-between;
}
.about_wrap{
    width: 853px;
    .box_common_style;
    padding-bottom: 100px;
}
.about_title{
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
}
.main{
    color: #888;
    font-size: 15px;
    span{
        color: #000;
    }
}
.simple_intro{
    line-height: 2;
}
.experience, 
.other_info{
    margin-top: 30px;
    h1{
        padding-left: 10px;
        border-left: 3px solid #ccc;
        color: @primary_color;
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 30px;
    }
    a{
        color: #2277da;
    }
}
.work_exp_item{
    margin-top: 16px;
    padding-left: 14px;
    h2{
        font-size: 15px;
        font-weight: 600;
    }
}
.work_date{
    font-size: 13px;
    margin-left: 4px;
}
.work_post{
    font-size: 13px;
    margin-top: 4px;
}
.work_list{
    font-size: 13px;
    list-style-type: disc;
    padding-left: 20px;
    line-height: 25px;
    margin-top: 8px;
}
.other_info{
    p{
        margin-top: 13px;
    }
    span{
        display: inline-block;
        width: 150px;
    }
}

@media screen and (max-width: 768px) {
    .about_page_wrap{
        display: block;
    }
    .info_box_wrap{
        display: none;
    }
    .about_wrap{
        width: 100%;
    }
    .other_info{
        font-size: 13px;
        p{
            margin-top: 13px;
        }
        span{
            width: 80px;
        }
    }
}
</style>