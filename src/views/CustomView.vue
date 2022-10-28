<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <v-text-field
            label="Todo input"
            v-model="text"
            ref="refText"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="1">
          <v-btn class="mr-4" @click="apply"> 등록 </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <ul>
          <li v-if="todoList.length === 0">TODO를 등록해주세요.</li>
          <li v-for="(todo, index) in todoList" :key="index" class="list-li">
            <span class="todo-list-text" v-show="!todo.edit">
              {{ todo.text }}
            </span>
            <span v-show="todo.edit">
              <input class="todo-list-input" type="text" v-model="todo.text" />
            </span>
            <v-icon
              v-show="!todo.edit"
              class="icon"
              small
              @click="todo.edit = true"
              >edit</v-icon
            >
            <v-icon v-show="todo.edit" class="icon" small @click="save(todo)">
              done
            </v-icon>
            <v-icon class="icon" small @click="deleteItem(index)"
              >delete</v-icon
            >
          </li>
        </ul>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { callGetCustom, callPostCustom } from "@/service/custom";

const KEY = "TODO_LIST";

export default {
  data() {
    return {
      valid: false,
      text: "",
      todoList: [],
    };
  },

  methods: {
    async apply() {
      if (!this.text) {
        this.$refs.refText.focus();
        alert("TODO를 입력해주세요");
        return;
      }

      const todoList = [...this.todoList];
      todoList.push({ text: this.text, edit: false });
      const response = await callPostCustom(KEY, {
        todoList,
      });

      if (response.status === this.HTTP_OK) {
        this.todoList = todoList;
        this.text = "";
      } else {
        alert("네트워크 에러");
      }
    },

    async save(todo) {
      todo.edit = false;
      const response = await callPostCustom(KEY, {
        todoList: this.todoList,
      });

      if (!response.status === this.HTTP_OK) {
        alert("네트워크 에러");
      }
    },

    async deleteItem(index) {
      const todoList = [...this.todoList];
      todoList.splice(index, 1);

      const response = await callPostCustom(KEY, {
        todoList,
      });

      if (response.status === this.HTTP_OK) {
        this.todoList = todoList;
      } else {
        alert("네트워크 에러");
      }
    },
  },

  async created() {
    const response = await callGetCustom(KEY);
    if (response.status === this.HTTP_OK) {
      this.todoList = response?.data?.todoList ?? [];
    } else {
      alert("네트워크 에러");
    }
  },
};
</script>

<style>
.input-text {
  border: 1px solid black;
}

.icon {
  cursor: pointer;
}

.todo-list-text {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 22px;
}

.todo-list-input {
  margin-left: 10px;
  margin-right: 10px;
  border: 1px solid gray;
}
</style>
