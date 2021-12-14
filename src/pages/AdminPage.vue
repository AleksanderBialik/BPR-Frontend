<template>
  <v-row
    class="shadow"
    style="
      max-width: 1400px;
      margin: auto;
      background-color: white;
      border-radius: 4px;
    "
    ><v-col cols="12">
      <v-data-table :headers="userHeaders" :items="users"
        ><template v-slot:top>
          <v-btn @click="downloadLogs()" color="success">Download logs</v-btn>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="pl-1">
            <v-btn @click="removeUser(item)" small color="error">Remove</v-btn>
          </div>
        </template>
        <template v-slot:[`item.dateCreated`]="{ item }">
          <span>{{ formatDate(item.dateCreated) }}</span>
        </template>
        <template v-slot:[`item.dateUpdated`]="{ item }">
          <span v-if="item.dateUpdated">{{
            formatDate(item.dateUpdated)
          }}</span>
        </template>
      </v-data-table></v-col
    ></v-row
  >
</template>

<script>
import moment from "moment";
export default {
  name: "AdminPage",
  created() {
    this.$store.dispatch("admin/fetchUsers");
  },
  computed: {
    users() {
      return this.$store.getters["admin/getUsers"].filter((obj) => {
        return obj.isAdmin === false;
      });
    },
  },
  data() {
    return {
      userHeaders: [
        { text: "Email", value: "email" },
        { text: "Username", value: "username" },
        { text: "Creation date", value: "dateCreated" },
        { text: "Update date", value: "dateUpdated" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, HH:mm:ss");
    },
    downloadLogs() {
      this.$store.dispatch("admin/downloadLogs");
    },
    removeUser(user) {
      this.$store.dispatch("admin/deleteUser", user.email);
    },
  },
};
</script>

<style></style>
