<template>
  <div id="app">
    <div class="page_loading" v-if="loading">
      <img src="./assets/images/loading.gif" />
    </div>
    <div v-else>
      <header-bar />
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header';
import {getInfo} from '@/api/author';
import {mapMutations} from 'vuex';
export default {
  name: 'app',
  data () {
      return {
        loading: true
      }
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      getInfo().then(res => {
        if (res.code === 200) {
          this.setUserInfo(res.data);
        }

        this.loading = false;
      });
    },
    ...mapMutations({
      setUserInfo: 'SET_USERINFO'
    })
  },
  components: {
    HeaderBar
  }
}
</script>

<style lang="less" scoped>
@import './assets/style/common.less';
.page_loading{
  width: 100%;
  text-align: center;
  padding-top: 300px;
  img{
    width: 100px;
  }
}
.main{
  width: @page_max_width;
  margin: 0 auto;
  margin-top: 20px;
  padding-bottom: 200px;
}
</style>
