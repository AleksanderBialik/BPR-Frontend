<template>
  <v-row justify="center">
    <v-col style="z-index: 9999" cols="12">
      <h1 class="text-center titleText" style="color: white">Register</h1>
    </v-col>
    <v-col cols="6" style="z-index: 9999">
      <v-card
        style="border-radius: 30px"
        class="pt-10 shadow"
        color="rgba(255, 255, 255, 1)"
      >
        <ValidationObserver
          ref="logObs"
          v-slot="{ invalid, handleSubmit }"
          mode="lazy"
        >
          <v-form @submit.prevent="handleSubmit(onRegister)" class="mx-5">
            <VTextFieldWithValidation
              type="text"
              label="Email"
              rules="emailRequired|email"
              v-model="email"
              outlined
              dense
            />
            <VTextFieldWithValidation
              type="text"
              label="Username"
              rules="username|usernameRegex"
              v-model="username"
              outlined
              dense
            />
            <VTextFieldWithValidation
              label="Password"
              type="password"
              vid="password"
              rules="pass|minPassword:8"
              v-model="password"
              outlined
              dense
            />

            <VTextFieldWithValidation
              label="Confirm password"
              type="password"
              v-model="confirmPassword"
              rules="pass|password:@password"
              outlined
              dense
            />
            <v-spacer></v-spacer>
            <v-card-actions class="justify-center flex-column">
              <v-btn class="mb-2" type="submit" :disabled="invalid">
                Register</v-btn
              >
              <v-card-subtitle
                >Already have an account?
                <span
                  @click="$router.push({ name: 'login' })"
                  style="color: blue; cursor: pointer"
                  >Login
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
  name: "register",

  components: {
    VTextFieldWithValidation,
    ValidationObserver,
  },
  data: () => ({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  }),
  methods: {
    async onRegister() {
      let credentials = {
        email: this.email,
        username: this.username,
        password: this.password,
      };
      this.$refs.logObs.reset();
      await this.$store.dispatch("authentication/register", credentials);
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
