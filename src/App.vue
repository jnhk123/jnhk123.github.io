<template>
  <div>
    <LayoutView v-if="hasToken"></LayoutView>
    <LoginView v-else></LoginView>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LoginView from "@/views/login/LoginView.vue";
import LayoutView from "@/views/layout/LayoutView.vue";

export default {
  components: {
    LayoutView,
    LoginView,
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters({ hasToken: "user/hasToken" }),
  },
};
</script>

<style scoped></style>
