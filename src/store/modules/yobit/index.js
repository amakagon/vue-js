import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import initialState from './initial-state';

const state = initialState();

export default {
    state,
    getters,
    mutations,
    actions
}