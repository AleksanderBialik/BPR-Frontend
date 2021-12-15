<template>
  <ValidationProvider
    :name="$attrs.label"
    :rules="rules"
    v-slot="{ errors }"
    :vid="vid"
  >
    <v-text-field
      :type="type"
      v-model="innerValue"
      :error-messages="errors"
      v-bind="$attrs"
      v-on="$listeners"
      :outlined="!filled"
      :filled="filled"
      color="black"
      :background-color="!filled ? 'white' : ''"
      :rounded="!filled"
      dense
    ></v-text-field>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider,
  },
  props: {
    rules: {
      type: [Object, String],
      default: "",
    },
    value: {
      type: null,
    },
    vid: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    filled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    innerValue: "",
  }),
  watch: {
    value(newVal) {
      this.innerValue = newVal;
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  },
};
</script>
