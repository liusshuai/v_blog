<template>
  <div id="app">
    <div class="page_loading" v-if="loading">
      <img src="./assets/images/loading.gif" />
    </div>
    <div v-else>
      <div class="pc_header_wrap">
        <header-bar />
      </div>
      <div class="h5_header_wrap">
        <h5-header />
      </div>
      <div class="main">
        <router-view />
      </div>
      <div class="my_music" ref="music">
        <div class="music_main">
          <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" height=430
            src="//music.163.com/outchain/player?type=0&id=108771353&auto=0&height=430"></iframe>
        </div>
        <div class="music_derail">
          <span @click="toggleMusicIframe">
            <i class="icon-music"/>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header';
import H5Header from '@/components/h5Header';
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
    this.musicOpen = false;
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
    toggleMusicIframe() {
      if (!this.musicOpen) {
        this.$refs.music.style.marginLeft = '0';
        this.musicOpen = true;
      } else {
        this.$refs.music.style.marginLeft = '-300px';
        this.musicOpen = false;
      }
    },
    ...mapMutations({
      setUserInfo: 'SET_USERINFO'
    })
  },
  components: {
    HeaderBar,
    H5Header
  },
  watch: {
    $route() {
      this.musicOpen && this.toggleMusicIframe();
    }
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
.h5_header_wrap{
  display: none;
}
.main{
  width: @page_max_width;
  margin: 0 auto;
  margin-top: 20px;
  padding-bottom: 200px;
}
.my_music{
  position: fixed;
  top: 80px;
  left: 0;
  margin-left: -300px;
  display: flex;
  transition: all .8s;
}
.music_main{
  position: relative;
  width: 300px;
  background: #24292c;
  border-radius: 0 8px 8px 0;
}
.music_derail{
  span{
    display: inline-block;
    margin-top: 60px;
    background: #24292c;
    color: #fff;
    padding: 10px 16px 10px 10px;
    border-radius: 0 12px 12px 0;
    cursor: pointer;
  }
}

@media screen and (max-width: 768px) {
  .my_music,
  .pc_header_wrap{
    display: none;
  }
  .h5_header_wrap{
    display: block;
  }
  .main{
    width: 100%;
    margin-top: 60px;
    padding-bottom: 100px;
  }
}
</style>
