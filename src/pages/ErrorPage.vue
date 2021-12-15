<template>
  <v-row justify="center"
    ><v-col cols="5"
      ><v-card class="pt-3" color="rgba(255, 255, 255, 1)" elevation="24"
        ><v-card-title class="justify-center">
          Hey! You're not supposed to be here!</v-card-title
        >
        <v-card-actions class="justify-center"
          ><v-btn :to="{ name: 'home' }" color="success"
            >Let me out!</v-btn
          ></v-card-actions
        >
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style></style>
