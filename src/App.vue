<template>
  <div>
    <LoadingBar>
      <LayoutView v-if="hasToken"></LayoutView>
      <LoginView v-else></LoginView>
    </LoadingBar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LoginView from "@/views/login/LoginView.vue";
import LayoutView from "@/views/layout/LayoutView.vue";
import LoadingBar from "@/components/LoadingBar.vue";

export default {
  components: {
    LayoutView,
    LoginView,
    LoadingBar,
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
