<template>
  <div>
    <v-snackbar
      bottom
      :right="$vuetify.breakpoint.name != 'xs'"
      :value="show"
      :timeout="-1"
      :color="color"
      transition="scale-transition"
    >
      <div class="d-flex align-center">
        <v-icon class="mr-3">{{ icon }}</v-icon>
        <span>{{ message }}</span>
      </div>

      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" v-on:click="closeSnackbar">
          <font-awesome-icon icon="times" />
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SnackbarQueue",

  computed: {
    ...mapState({
      show: (state) => state.snackbar.show,
      message: (state) => state.snackbar.message,
      color: (state) => state.snackbar.color,
      icon: (state) => state.snackbar.icon,
    }),
  },

  methods: {
    closeSnackbar() {
      this.$store.dispatch("snackbar/toggleSnackbar", false);
    },
  },

  watch: {
    show() {
      if (this.show) {
        setTimeout(() => {
          this.$store.dispatch("snackbar/toggleSnackbar", false);
        }, 5000);
      }
    },
  },
};
</script>

<style scoped></style>
