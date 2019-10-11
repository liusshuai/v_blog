import {mapGetters, mapMutations} from 'vuex';

export const userInfoMixin = {
    computed: {
        ...mapGetters([
            'userInfo'
        ])
    },
    methods: {
        followCallback() {
            const info = Object.assign({}, this.userInfo);
            info.followers += 1;
            this.setUserInfo(info);
        },
        ...mapMutations({
            setUserInfo: 'SET_USERINFO'
        })
    }
}