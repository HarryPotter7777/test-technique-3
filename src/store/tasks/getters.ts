import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { DishStateInterface } from './state';

const getters: GetterTree<DishStateInterface, StateInterface> = {
    dishes(state) {
        return state.dishes;
    }
}

export default getters;