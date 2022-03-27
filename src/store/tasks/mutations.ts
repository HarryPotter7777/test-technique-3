import { MutationTree } from 'vuex';
import { DishStateInterface } from './state';
import DishModel from '../../models/dish';

const mutation: MutationTree<DishStateInterface> = {
    add(state: DishStateInterface, payload: DishModel) {
        if (!state.dishes.find(dish => dish.id === payload.id)) {
            state.dishes.push(payload);
        }
    },

    update(state: DishStateInterface, payload: DishModel) {
        state.dishes = state.dishes.map(dish => dish.id === payload.id ? { ...dish, ...payload } : dish);
    },

    remove(state: DishStateInterface, payload: DishModel) {
        const index = state.dishes.findIndex(dish => dish.id === payload.id);
        if (index !== -1)
            state.dishes.splice(index, 1);
    }
}

export default mutation;