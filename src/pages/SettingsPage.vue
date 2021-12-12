<template>
  <v-row justify="center" style="max-width: 1400px; margin: auto"
    ><v-col cols="7">
      <v-card class="shadow" style="border-radius: 4px">
        <v-card><v-card-title>Account settings</v-card-title></v-card>
        <v-card class="d-flex align-stretch" width="100%"
          ><v-card width="100%"
            ><v-card-title>Details</v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-card-text
              >Email:<span style="color: black">{{
                user.email
              }}</span></v-card-text
            >
            <v-divider class="mx-4"></v-divider>
            <v-card-text
              >Username:<span style="color: black">{{
                user.username
              }}</span></v-card-text
            >
            <v-divider class="mx-4"></v-divider>
            <v-card-text
              >Joined:<span style="color: black">{{
                formatDate(user.joined)
              }}</span></v-card-text
            >
            <v-divider class="mx-4"></v-divider>
            <v-card-actions class="d-flex justify-center"
              ><v-btn color="warning" @click="changePasswordModal = true"
                >Change password</v-btn
              ></v-card-actions
            > </v-card
          ><v-card width="100%"
            ><v-card-title>Delete account</v-card-title>
            <v-card-text>This action is irreversible</v-card-text>
            <v-card-actions class="d-flex justify-center"
              ><v-btn @click="deleteAccountModal = true" color="error"
                >Delete</v-btn
              ></v-card-actions
            ></v-card
          ></v-card
        >
      </v-card>
      <v-dialog width="500" v-model="changePasswordModal">
        <v-card>
          <v-card-title>Change password</v-card-title>
          <ValidationObserver
            ref="logObs"
            v-slot="{ invalid, handleSubmit }"
            mode="lazy"
          >
            <v-form @submit.prevent="handleSubmit(onRegister)" class="mx-5">
              <VTextFieldWithValidation
                type="password"
                rules="pass|minPassword:8"
                v-model="oldPassword"
                label="Old password"
                outlined
                dense
              />
              <VTextFieldWithValidation
                label="New password"
                type="password"
                vid="password"
                rules="pass|minPassword:8"
                v-model="newPassword"
                outlined
                dense
              />

              <VTextFieldWithValidation
                label="Repeat password"
                type="password"
                v-model="repeatPassword"
                rules="pass|password:@password"
                outlined
                dense
              />
              <v-card-actions>
                <v-btn
                  @click="changePassword()"
                  class="mb-2"
                  type="submit"
                  :disabled="invalid"
                >
                  Change password</v-btn
                >
              </v-card-actions>
            </v-form>
          </ValidationObserver>
        </v-card>
      </v-dialog>
      <v-dialog width="500" v-model="deleteAccountModal">
        <v-card>
          <v-card-title>Are you sure?</v-card-title>
          <v-card-text>This action can't be reversed</v-card-text>
          <v-card-actions class="d-flex justify-center"
            ><v-btn @click="deleteAccount()" color="error">Delete</v-btn>
            <v-btn @click="deleteAccountModal = false" color="success"
              >Back</v-btn
            ></v-card-actions
          >
        </v-card>
      </v-dialog>
    </v-col>
    <!-- <v-col cols="3">
      <v-card class="d-flex align-center flex-column"
        ><v-card-title>Delete account</v-card-title
        ><v-card-actions><v-btn>Delete account</v-btn></v-card-actions></v-card
      ></v-col
    > -->
  </v-row>
</template>

<script>
import moment from "moment";
import VTextFieldWithValidation from "../components/inputs/VTextFieldWithValidation";
import { ValidationObserver } from "vee-validate";
export default {
  name: "Settings",
  components: { VTextFieldWithValidation, ValidationObserver },
  created() {
    this.$store.dispatch("user/fetchUser");
  },

  data() {
    return {
      changePasswordModal: false,
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
      deleteAccountModal: false,
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, HH:mm:ss");
    },
    changePassword() {
      let object = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      };
      this.$store.dispatch("user/changePassword", object).then((response) => {
        console.log(response);
      });
    },
    deleteAccount() {
      this.$store.dispatch("user/deleteAccount");
    },
  },
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    },
  },
};
</script>

<style></style>
