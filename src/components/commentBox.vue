<template>
    <div class="template_box_wrap" id="commentBox">
        <h3>{{title}}<span v-show="total">({{total}})</span></h3>
        <div class="cancle_reply" v-show="placeholder" @click="cancel">取消回复</div>
        <div><textarea @focus="focus" ref="content" v-model="content" :placeholder="placeholder"></textarea></div>
        <transition name="btn-fade">
            <div class="data_form" ref="form" v-show="showForm">
                <div class="info_input">
                    <h3>昵称<i style="color: red;">*</i></h3>
                    <input placeholder="您的昵称（必填）" v-model="username" />
                </div>
                <div class="info_input">
                    <h3>邮箱<i style="color: red;">*</i></h3>
                    <input placeholder="您的邮箱（必填，不公开）" v-model="useremail" />
                </div>
                <div class="info_input">
                    <h3>个人站点</h3>
                    <input placeholder="http:// 有就填，勿填广告链接" v-model="userblog" />
                </div>
                <div class="remmember"><input type="checkbox" v-model="isR" /> 记住信息</div>
            </div>
        </transition>
        <error-mess :text="errorText" />
        <div class="send_btn">
            <button @click="comment" type="button">评论</button> 💋
        </div>
    </div>
</template>

<script>
import ErrorMess from '@/components/errorMess';
import { checkEmail } from '@/util/util';
export default {
    data () {
        return {
            showForm: false,
            isR: false,
            content: '',
            username: '',
            useremail: '',
            userblog: '',
            errorText: ''
        };
    },
    props: {
        total: {
            type: Number,
            default: 0
        },
        title: {
            type: String,
            default: '评论'
        },
        placeholder: {
            type: String,
            default: ''
        }
    },
    mounted() {
        this.getInfoFromStorage();
    },
    methods: {
        getInfoFromStorage() {
            let info = localStorage.getItem('userInfo');
            if (!info) return;
            this.isR = true;
            info = JSON.parse(info);

            for (let key in info) {
                this[key] = info[key];
            }
        },
        comment() {
            if (!this.showForm) {
                this.showForm = true;
                return;
            }

            if (!this.content) {
                this.errorText = '内容不能为空';
                this.$refs.content.focus();
            } else if (!this.username) {
                this.errorText = '请输入昵称';
            } else if (!this.useremail) {
                this.errorText = '请输入邮箱';
            } else if (!checkEmail(this.useremail)) {
                this.errorText = '邮箱格式不正确';
            } else {
                const params = {
                    content: this.content,
                    username: this.username,
                    useremail: this.useremail
                };

                if (this.userblog) {
                    params.userblog = 'http://' + this.userblog.replace('http://', '');
                }

                this.$emit('comment', params);

                this.content = '';

                this.rememberInfo();
            }
        },
        rememberInfo() {
            if (this.isR) {
                const info = {
                    username: this.username,
                    useremail: this.useremail,
                    userblog: this.userblog
                };
                localStorage.setItem('userInfo', JSON.stringify(info));
            } else {
                localStorage.removeItem('userInfo');
            }
        },
        cancel() {
            this.$emit('cancel');
        },
        focus() {
            this.$refs.content.style.height = '200px';
        },
        toggleForm() {
            this.showForm = !this.showForm;
        }
    },
    components: {
        ErrorMess
    }
}
</script>

<style lang="less" scoped>
@import '../assets/style/common.less';
.common_padding{
    border: 1px solid #ccc;
    font-size: 14px;
    padding: 7px 9px;
    outline: none;
}
.template_box_wrap{
    margin-top: 20px;
    h3{
        margin: 12px 0;
    }
    textarea{
        width: 500px;
        height: 50px;
        transition: all 0.2s ease-out;
        .common_padding;
        // &:focus{
        //     height: 200px;
        // }
    }
}
.info_input{
    input{
        width: 250px;
        .common_padding;
    }
}
.cancle_reply{
    display: inline-block;
    color: #fff;
    font-size: 12px;
    padding: 4px 10px;
    background: @primary_color;
    margin-bottom: 10px;
    border-radius: 4px;
    cursor: pointer;
}
.remmember{
    margin: 10px 0;;
    font-size: 14px;
    color: #aaa;
}
.send_btn{
    button{
        font-size: 14px;
        padding: 5px 40px;
        color: #fff;
        border: none;
        background: @primary_color;
        cursor: pointer;
        outline: none;
        border-radius: 4px;
    }
}

.btn-fade-enter-active, .btn-fade-leave-active {
  transition: all .4s ease-in-out;
}
.btn-fade-enter, .btn-fade-leave-to{
  opacity: 0;
  height: 0;
}

@media screen and (max-width: 768px) {
    .template_box_wrap{
        textarea{
            width: 100%;
        }
    }
}
</style>