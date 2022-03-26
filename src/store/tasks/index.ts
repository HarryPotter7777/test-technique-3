import { Module } from 'vuex';
import { StateInterface } from '../index';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state, { DishStateInterface } from './state';

const taskModule: Module<DishStateInterface, StateInterface> = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

export default taskModule;