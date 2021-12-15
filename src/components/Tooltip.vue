<template>
  <v-tooltip
    max-width="200px"
    :right="!bottom"
    :bottom="bottom"
    offset-overflow
    open-on-hover
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        style="z-index: 2"
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
    <span v-html="text"></span>
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
    bottom: {
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
