<template>
  <div class="board-post">
    <v-card>
      <form @submit.prevent="submit" style="width: 95%; margin: 0 auto">
        <v-row>
          <v-text-field v-model="title" label="제목" required></v-text-field>
        </v-row>
        <v-row :style="{ 'margin-bottom': '20px' }">
          <Editor
            ref="toastEditor"
            initialEditType="wysiwyg"
            :style="{ width: '100%' }"
            height="500px"
            previewStyle="vertical"
          >
          </Editor>
        </v-row>
        <v-row>
          <v-btn type="submit" class="btn-cls" style="margin-left: auto">
            등록
          </v-btn>
          <v-btn
            type="submit"
            class="btn-cls"
            @click="$router.push({ name: 'board' })"
            >취소
          </v-btn>
        </v-row>
      </form>
    </v-card>
  </div>
</template>

<script>
import { Editor } from "@toast-ui/vue-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { getBoard, patchBoard, postBoard } from "@/service/board";

export default {
  components: {
    Editor,
  },

  data() {
    return {
      title: "",
      // contents: "",

      bno: 0,
    };
  },

  methods: {
    submit() {
      this.callPostBoard();
    },

    async callPostBoard() {
      try {
        if (this.$route.params.id) {
          const response = await patchBoard({
            title: this.title,
            contents: this.getContent(),
            bno: this.bno,
          });

          if (response.status === 200) {
            alert("수정 완료");
            this.$router.push({ name: "board" });
          }
        } else {
          const response = await postBoard({
            title: this.title,
            contents: this.getContent(),
          });
          if (response.status === 201) {
            alert("등록 완료");
            this.$router.push({ name: "board" });
          }
        }
      } catch (error) {
        alert("통신실패");
        console.error(error);
      }
    },

    async callGetBoard() {
      try {
        const board = await getBoard(this.bno);
        this.title = board.data.title;
        this.setContent(board.data.contents);
        // this.contents = board.data.contents;
      } catch (error) {
        alert("통신실패");
        console.error(error);
      }
    },

    getContent() {
      return this.$refs.toastEditor.invoke("getMarkdown");
    },

    setContent(content) {
      this.$refs.toastEditor.invoke("setMarkdown", content);
    },
  },

  created() {
    this.bno = this.$route.params.id;
    if (this.bno) {
      this.callGetBoard();
    }
  },
};
</script>

<style>
.board-post {
  margin: 20px auto 0px;
  width: 95%;
}

.btn-cls {
  margin-bottom: 20px;
  margin-right: 10px;
}
</style>
