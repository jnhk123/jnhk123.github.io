<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="board">
    <v-row style="display: flex">
      <v-btn
        style="margin-left: auto"
        @click="$router.push({ name: 'boardPost' })"
      >
        게시물 등록
      </v-btn>
    </v-row>

    <v-row>
      <v-data-table :headers="headers" :items="boards" style="width: 100%">
        <!-- 작성시간 -->
        <template #[`item.createdAt`]="{ item }">
          {{ toWriteTime(new Date(item.createdAt)) }}
        </template>

        <template #[`item.title`]="{ item }">
          <span
            class="custom-title"
            @click="$router.push(`/board/${item.bno}`)"
          >
            {{ item.title }}
          </span>
        </template>

        <!-- 테이블 동작 -->
        <template #[`item.actions`]="{ item }">
          <template v-if="userId === item.writer">
            <v-icon
              small
              @click="$router.push(`/board/post/${item.bno}`)"
              class="mr-2"
            >
              mdi-pencil
            </v-icon>
            <v-icon small @click="callDelete(item)"> mdi-delete </v-icon>
          </template>
        </template>

        <!-- 데이터 없을때 화면 -->
        <template #no-data>
          <v-btn color="primary" @click="initialize"> 새로고침 </v-btn>
        </template>
      </v-data-table>
    </v-row>
  </div>
</template>

<script>
import { deleteBoard, getBoards } from "@/service/board";
import date from "@/mixins/date";
import { mapGetters } from "vuex";

export default {
  mixins: [date],

  data() {
    return {
      dialogDelete: false,
      boards: [],
      headers: [
        {
          text: "게시물 번호",
          align: "start",
          sortable: true,
          value: "bno",
        },
        { text: "제목", value: "title" },
        { text: "추천수", value: "likeCnt" },
        { text: "비추천수", value: "hateCnt" },
        { text: "작성자", value: "writer" },
        { text: "등록일", value: "createdAt" },
        { text: "", value: "actions", sortable: false },
      ],
    };
  },

  computed: {
    ...mapGetters("user", { userId: "id" }),
  },

  methods: {
    initialize() {
      this.callGetBoards();
    },

    async callGetBoards() {
      try {
        const response = await getBoards();
        this.boards = response.data;
      } catch (error) {
        alert("통신실패");
        console.error(error);
      }
    },
    // 삭제여부 모달 창 on
    async callDelete(item) {
      if (confirm("삭제 하시겠습니까?")) {
        const response = await deleteBoard(item.bno);
        if (response.status === 200) {
          alert("삭제 되었습니다.");
          this.callGetBoards();
        }
      }
    },
  },

  created() {
    this.initialize();
  },
};
</script>

<style scoped>
.board {
  margin: 20px auto 0px;
  width: 95%;
}

.custom-title {
  cursor: pointer;
}
</style>
