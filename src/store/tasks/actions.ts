import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { DishStateInterface } from './state';
import DishModel from '../../models/dish';

export default <ActionTree<DishStateInterface, StateInterface>>{
    add({ commit }, dish: DishModel) {
        commit('add', dish);
    },
    update({ commit }, dish: DishModel) {
        commit('update', dish);
    },
    remove({ commit }, dish: DishModel) {
        commit('remove', dish);
    }
}