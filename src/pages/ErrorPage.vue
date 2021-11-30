<template>
  <v-row justify="center"
    ><v-col cols="6"
      ><v-card shaped class="pt-3" color="rgba(255, 255, 255, 1)" elevation="24"
        ><v-card-title class="justify-center">
          Ooops this a forbidden page</v-card-title
        >
        <v-card-actions class="justify-center"
          ><v-btn :to="{ name: 'entry' }" color="success"
            >Back to safety</v-btn
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
