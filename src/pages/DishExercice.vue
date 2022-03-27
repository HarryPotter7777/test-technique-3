<template>
  <q-page class="q-pa-lg">
    <div class="row q-gutter-lg">
      <q-intersection v-for="dish in dishes" :key="dish.id" transition="fade">
        <dish-item :dish="dish" />
      </q-intersection>

      <add-button @click="setFormDish('add')" />

      <q-dialog v-model="showFormDish">
        <form-dish @submit="handleNewDish" :action="action" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script lang="ts">
import DishModel from "../models/dish";
import { mapGetters, mapActions } from "vuex";
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  components: {
    "dish-item": defineAsyncComponent(
      () => import("../components/DishItem.vue")
    ),
    "add-button": defineAsyncComponent(
      () => import("../components/AddButton.vue")
    ),
    "form-dish": defineAsyncComponent(
      () => import("../components/FormDish.vue")
    ),
  },

  data() {
    return {
      action: "",
      showFormDish: false,
    };
  },

  computed: {
    ...mapGetters("tasks", ["dishes"]),
  },

  methods: {
    ...mapActions("tasks", ["add"]),

    handleNewDish(dish: DishModel) {
      this.showFormDish = false;
      // mock a dish id
      if (dish.id === 0) {
        let id = 0;
        // find last dish id
        this.dishes.forEach((dish: DishModel) => {
          if (dish.id > id) id = dish.id;
        });
        dish.id = id + 1;
      }
      this.add(dish);
    },

    setFormDish(type: string): void {
      this.action = type;
      this.showFormDish = true;
    },
  },
});
</script>
