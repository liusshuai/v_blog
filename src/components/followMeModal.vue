<template>
<transition name="bounce">
    <div class="follow_me_modal" v-show="visible">
        <div class="mask"></div>
        <div class="handle" @click="closeModel"></div>
        <div class="follow_box">
            <h1>欢迎订阅</h1>
            <input placeholder="昵称" v-model="username" />
            <input placeholder="邮箱" v-model="email" />
            <button type="button" @click="followBlog">订阅</button>
            <error-mess :text="errorText" />
            <p v-show="!errorText" class="follow_info">订阅成功后有文章更新时会以邮件形式通知，邮箱不会对外公布。</p>
        </div>
    </div>
</transition>
</template>

<script>
import ErrorMess from '@/components/errorMess';
import { follow } from '@/api/follow';
import { checkEmail } from '@/util/util';
export default {
    data() {
        return {
            username: '',
            email: '',
            errorText: ''
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        followBlog() {
            if (!this.username) {
                this.errorText = '请输入昵称';
            } else if (!this.email) {
                this.errorText = '请输入邮箱';
            } else if (!checkEmail(this.email)) {
                this.errorText = '邮箱格式不正确';
            } else {
                follow({
                    username: this.username,
                    email: this.email
                }).then(res => {
                    if (res.code === 200) {
                        this.errorText = '';
                        this.username = '';
                        this.email = '';
                        this.$emit('followSuccess');
                    } else {
                        this.errorText = res.msg;
                    }
                });
            }
        },
        closeModel() {
            this.$emit('close');
        }
    },
    components: {
        ErrorMess
    }
}
</script>

<style lang="less" scoped>
.follow_me_modal{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
}
.handle{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}
.mask{
    position: absolute;
    top: -20%;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.65);
}
.follow_box{
    position: absolute;
    top: 40%;
    left: 50%;
    width: 388px;
    height: 288px;
    margin-top: -144px;
    margin-left: -194px; 
    background: #fff;
    padding: 0 40px;
    border-radius: 8px;
    h1{
        padding: 20px;
    }
    input{
        display: block;
        width: 100%;
        border: 1px solid #ccc;
        font-size: 14px;
        padding: 9px 15px;
        outline: none;
        margin-bottom: 10px;
    }
    button{
        display: block;
        width: 100%;
        padding: 9px 0;
        color: #fff;
        background: #24292c;
        font-size: 14px;
        border: none;
        border-radius: 2px;
        outline: none;
        cursor: pointer;
    }
}
.follow_info{
    font-size: 13px;
    color: #aaa;
    text-align: left;
    margin-top: 20px;
}

.bounce-enter-active {
  animation: bounce-in .3s;
}
.bounce-leave-active {
  animation: bounce-in .3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}

@media screen and (max-width: 768px) {
    .follow_box{
        width: 320px;
        margin-left: -160px; 
    }
}
</style>