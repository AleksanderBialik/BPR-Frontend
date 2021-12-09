<template>
  <v-row justify="center">
    <v-col style="z-index: 9999" cols="12">
      <h1 class="text-center titleText" style="color: white">Login</h1>
    </v-col>
    <v-col cols="6">
      <v-card
        shaped
        class="pt-10"
        color="rgba(255, 255, 255, 1)"
        elevation="24"
      >
        <ValidationObserver
          ref="logObs"
          v-slot="{ invalid, handleSubmit }"
          mode="lazy"
        >
          <v-form @submit.prevent="handleSubmit(onLogin)" class="mx-5">
            <VTextFieldWithValidation
              type="text"
              placeholder="Email"
              rules="emailRequired"
              v-model="email"
              outlined
              dense
            />
            <VTextFieldWithValidation
              placeholder="Password"
              type="password"
              vid="password"
              rules="pass|minPassword:8"
              v-model="password"
              outlined
              dense
            />
            <v-spacer></v-spacer>
            <v-card-actions class="justify-center flex-column">
              <v-btn class="mb-2" type="submit" :disabled="invalid">
                Login</v-btn
              >
              <v-card-subtitle
                >Don't have an account?
                <span
                  @click="$router.push({ name: 'register' })"
                  style="color: blue; cursor: pointer"
                  >Register
                </span></v-card-subtitle
              >
            </v-card-actions>
          </v-form>
        </ValidationObserver>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import VTextFieldWithValidation from "../components/inputs/VTextFieldWithValidation";
import { ValidationObserver } from "vee-validate";
export default {
  name: "login",

  components: {
    VTextFieldWithValidation,
    ValidationObserver,
  },
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    async onLogin() {
      let credentials = {
        email: this.email,
        password: this.password,
      };
      this.$refs.logObs.reset();
      await this.$store.dispatch("authentication/login", credentials);
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 5em;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 2px;
}
</style>
