<template>
  <v-app>
    <v-card width="500" style="top: 25%" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h3>Login</h3>
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
            label="Id"
            v-model="id"
            @keyup.enter="$refs.pwd.focus()"
          />
          <v-text-field
            ref="pwd"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            v-model="password"
            @keyup.enter="login"
          />
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <SignUpModalViewVue btn-color="success">
          <template v-slot:title>회원가입</template>
        </SignUpModalViewVue>
        <v-btn color="info" @click="login" style="margin-left: 8px">
          로그인
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import SignUpModalViewVue from "../login/SignUpModalView.vue";
import { login as _login, getUser } from "@/service/auth";

export default {
  data: () => ({
    showPassword: false,
    id: "",
    password: "",
  }),

  methods: {
    ...mapActions("user", ["setToken", "setName", "setId"]),

    async login() {
      try {
        const response = await _login({ id: this.id, pwd: this.password });
        this.setToken(response.data.token);

        const user = await getUser();
        this.setId(user.data.id);
        this.setName(user.data.name);
      } catch (error) {
        console.error(error);
      }
    },
  },
  components: {
    SignUpModalViewVue,
  },
};
</script>

<style></style>
