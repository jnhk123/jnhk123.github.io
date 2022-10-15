<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Application </v-list-item-title>
          <v-list-item-subtitle> 부제목 </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-toolbar-title>제목</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon @click="logout">logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      items: [
        { title: "Home", icon: "home", to: "/" },
        { title: "Board", icon: "table_rows", to: "/board" },
      ],
      right: null,
    };
  },

  methods: {
    ...mapActions({ setToken: "user/setToken" }),
    logout() {
      if (confirm("로그아웃 하시겠습니까?")) {
        this.setToken("");
      }
    },
  },
};
</script>

<style scoped></style>
