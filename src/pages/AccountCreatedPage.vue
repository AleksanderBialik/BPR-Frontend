<template>
  <v-row justify="center">
    <v-col style="z-index: 9999" cols="4">
      <v-card
        style="border-radius: 30px"
        class="shadow"
        color="rgba(255, 255, 255, 1)"
        elevation="24"
      >
        <v-card-title class="justify-center"
          >Account created successfully!</v-card-title
        >
        <v-card-text class="text-center"
          >The confirmation link has been sent to {{ getEmail }}
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn x-large :to="{ name: 'login' }" color="success">LOGIN</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "AccountCreated",
  created() {},
  computed: {
    getEmail() {
      return this.$store.getters["authentication/getEmail"];
    },
  },
};
</script>

<style></style>
