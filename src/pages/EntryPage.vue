<template>
  <v-row justify="space-around">
    <v-col style="z-index: 9999" cols="12">
      <h1 class="text-center titleText" style="color: white">StockX</h1>
    </v-col>
    <v-col style="z-index: 9999" cols="12" lg="5">
      <v-card dark color="rgba(0, 0, 0, 0)" elevation="0">
        <v-card-title class="justify-center"
          >Don't have an account?</v-card-title
        >
        <v-card-actions class="justify-center">
          <v-btn x-large block :to="{ name: 'register' }" color="cyan"
            >REGISTER</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col style="z-index: 9999" cols="12" lg="5">
      <v-card dark color="rgba(0, 0, 0, 0)" elevation="0">
        <v-card-title class="justify-center">Have an account?</v-card-title>
        <v-card-actions class="justify-center">
          <v-btn x-large block :to="{ name: 'login' }" color="success"
            >LOGIN</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
