<template>
  <v-tooltip right offset-overflow open-on-hover>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="success" icon v-bind="attrs" v-on="on">
        <v-icon small>$question</v-icon>
      </v-btn>
    </template>
    {{ text }}
  </v-tooltip>
</template>

<script>
export default { props: ["text"] };
</script>

<style></style>
