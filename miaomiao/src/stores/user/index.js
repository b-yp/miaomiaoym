const state = {
    name : window.localStorage.getItem('name') || '',
    isAdmin : window.localStorage.getItem('isAdmin') ||  false,
    userHead : ''
};

const actions = {

};

const mutations = {
    USER_NAME(state , payload){
        state.name = payload.name;
        state.isAdmin = payload.isAdmin;
        state.userHead = payload.userHead;
    }
};

export default {
    namespaced : true,
    state,
    actions,
    mutations
}