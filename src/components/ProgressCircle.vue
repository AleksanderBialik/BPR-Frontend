<template>
  <div class="position" v-if="array.length === 0">
    <v-progress-circular
      :size="100"
      indeterminate
      color="white"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  props: ["array"],
};
</script>

<style></style>
