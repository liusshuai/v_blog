import * as types from './mutation-types';

const mutation = {
    [types.SET_USERINFO](state, info) {
        state.userInfo = info;
    }
};

export default mutation;