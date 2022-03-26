<template>
  <q-card class="form-card">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6 heading">{{ title }}</div>
    </q-card-section>
    <q-separator />
    <form @submit.prevent="onSubmit">
      <q-card-section>
        <div class="row q-mb-md">
          <q-input
            filled
            v-model="v$.dish.name.$model"
            label="Nom (Burger)"
            class="col"
            error-message="Le nom est limité à 20 caractères"
            :error="v$.dish.name.$error"
          />
        </div>

        <div class="row q-mb-md">
          <q-input
            filled
            v-model="v$.dish.description.$model"
            label="Description"
            type="textarea"
            class="col"
            error-message="La description est limitée à 135 caractères"
            :error="v$.dish.description.$error"
          />
        </div>

        <div class="row q-mb-md">
          <q-input
            filled
            label="URL de l'image"
            class="col"
            v-model="dish.image"
          />
          <q-img
            :src="dish.image || 'image-placeholder.png'"
            class="q-ml-sm"
            fit="contain"
          />
        </div>

        <div class="q-mb-md">
          <div class="row">
            <p class="q-mb-none text-subtitle1">Note</p>
          </div>
          <div class="row">
            <q-rating v-model="dish.note" size="2em" color="orange" />
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn label="Annuler" color="grey" v-close-popup />
        <q-btn type="submit" label="Sauver" color="primary" />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useQuasar } from "quasar";
import useVuelidate from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import DishModel from "../models/dish";

export default defineComponent({
  emits: ["submit"],

  props: {
    action: String,
    payload: {
      type: Object as PropType<DishModel>,
    },
  },

  setup: () => ({ v$: useVuelidate(), q$: useQuasar() }),

  created(): void {
    if (this.action === "update" && this.payload)
      this.dish = { ...this.payload };
  },

  validations() {
    return {
      dish: {
        name: { required, maxLengthValue: maxLength(20) },
        description: { maxLengthValue: maxLength(135) },
      },
    };
  },

  data(): { dish: DishModel } {
    return {
      dish: {
        id: 0,
        name: "",
        description: "",
        note: 1,
        image: "",
      },
    };
  },

  computed: {
    title: function (): string {
      return this.action === "add" ? "Ajouter un plat" : "Modifier le plat";
    },
  },

  methods: {
    async onSubmit(): Promise<void> {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        this.q$.notify({
          color: "red-4",
          textColor: "white",
          icon: "warning",
          message: "Erreur de validation.",
        });
      } else {
        this.q$.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message:
            this.action === "update" ? "Modification du plat" : "Ajout du plat",
        });
        this.$emit("submit", this.dish);
      }
    },
  },
});
</script>

<style>
.form-card {
  min-width: 400px;
}
.form-card .q-card-section {
  width: 100%;
}
.thumbnail {
  max-width: 50px;
  max-height: 50px;
}
.form-card .q-img {
  height: 56px;
  width: 56px;
  border-radius: 10px;
}
.form-card .q-img__image {
  background-size: cover !important;
}
.form-card .q-rating__icon {
  opacity: 0.2;
}
.form-card .q-rating__icon--active {
  opacity: 1;
}
</style>
