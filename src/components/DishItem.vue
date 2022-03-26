<template>
  <q-card class="card">
    <q-img :src="dish.image || 'image-placeholder.png'" basic fit="cover">
      <div class="absolute-bottom text-h6">
        {{ dish.name }}
      </div>
    </q-img>

    <q-card-section>
      <q-rating
        :model-value="dish.note"
        size="2em"
        color="orange"
        readonly
        class="q-mt-sm"
      />
    </q-card-section>

    <q-card-section :class="descriptionStyle">
      {{ dish.description || "Aucune description fournie" }}
    </q-card-section>

    <q-card-actions class="absolute-bottom" align="right">
      <q-btn @click="showFormDish = true" icon="edit" color="primary" flat
        >Modifier</q-btn
      >

      <q-btn @click="showConfirmation = true" icon="delete" color="red" flat
        >Supprimer</q-btn
      >

      <q-dialog v-model="showConfirmation">
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6 heading">Supprimer un plat</div>
          </q-card-section>
          <q-separator />
          <q-card-section
            class="bg-primary bg-grey-3 confirm-card-message row justify-center items-center"
          >
            <span class="q-ml-sm"
              >Êtes-vous sûr de vouloir supprimer ce plat ?</span
            >
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-separator />
            <q-btn label="Annuler" color="grey" v-close-popup />
            <q-btn
              type="submit"
              label="Supprimer"
              color="primary"
              @click="removeDish(dish)"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card-actions>

    <q-dialog v-model="showFormDish">
      <form-dish action="update" :payload="dish" @submit="updateDish" />
    </q-dialog>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, defineAsyncComponent } from "vue";
import { mapActions } from "vuex";
import { useQuasar } from "quasar";
import DishModel from "../models/dish";

export default defineComponent({
  setup: () => ({ q$: useQuasar() }),

  props: {
    dish: {
      type: Object as PropType<DishModel>,
    },
  },

  data(): { showFormDish: boolean; showConfirmation: boolean } {
    return {
      showConfirmation: false,
      showFormDish: false,
    };
  },

  components: {
    "form-dish": defineAsyncComponent(() => import("./FormDish.vue")),
  },

  computed: {
    descriptionStyle: function (): string {
      return this.dish?.description ? "text-body2" : "text-italic";
    },
  },

  methods: {
    ...mapActions("tasks", ["update", "remove"]),

    updateDish(dish: DishModel): void {
      this.showFormDish = false;
      this.update(dish);
    },

    removeDish(dish: DishModel): void {
      this.q$.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Suppression du plat",
      });
      this.showFormDish = false;
      this.remove(dish);
    },
  },
});
</script>

<style>
.card {
  min-height: 425px;
  max-width: 250px;
  width: 250px;
  transition: background 0.3s;
}
.confirm-card-message {
  min-height: 100px;
  min-width: 250px;
}
.card-clickable {
  cursor: pointer;
}
.card-clickable:hover {
  background: #bdbdbd !important;
}
.card .q-img {
  max-height: 180px;
}
.card .q-img__image {
  background-size: cover !important;
}
.card .q-rating__icon {
  opacity: 0.2;
}
.card .q-rating__icon--active {
  opacity: 1;
}
</style>
