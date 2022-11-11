<template>
  <div>
    <v-dialog v-model="loading" width="50" persistent>
      <v-progress-circular
        class="loading-bar"
        :size="50"
        indeterminate
      ></v-progress-circular>
    </v-dialog>

    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("loading", ["loading"]),
  },
};
</script>

<style>
.loading-bar {
  width: 100%;
  height: 100%;
  z-index: 99;
  position: absolute;
  top: 49%;
  left: 49%;
}
</style>
