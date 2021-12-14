<template>
  <v-tooltip
    :color="color ? color : ''"
    max-width="200px"
    right
    offset-overflow
    open-on-hover
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        style="z-index: 99999"
        :absolute="absolute"
        color="success"
        x-small
        icon
        v-bind="attrs"
        v-on="on"
        :class="{ margin: cls }"
      >
        <v-icon :x-small="!medium" :small="medium">$question</v-icon>
      </v-btn>
    </template>
    {{ text }}
  </v-tooltip>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    cls: {
      type: Boolean,
      default: false,
    },
    stl: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    medium: {
      type: Boolean,
      default: false,
    },
    absolute: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.margin {
  margin-left: 19px;
  margin-top: 50px;
}
</style>
