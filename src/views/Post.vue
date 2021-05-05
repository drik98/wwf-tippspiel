<template>
  <v-container>
    <h3>Kommentare zu {{ this.post.title }}</h3>
    <v-spacer />
    <v-timeline v-if="comments.length > 0">
      <v-timeline-item v-for="comment in comments" :key="comment.id" fill-dot>
        <template v-slot:icon>
          <v-avatar>
            <img
              :src="`https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=${comment.from.id}&height=50&width=50&ext=1622731891&hash=AeQOnPMB92ALjgcC9Ng`"
            />
          </v-avatar>
        </template>
        <template v-slot:opposite>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">{{
                formatDate(comment.created_time)
              }}</span>
            </template>
            <p :style="{ 'white-space': 'pre-line' }">{{ comment.message }}</p>
          </v-tooltip>
        </template>
        <v-card>
          <v-card-title>{{ comment.from.name }}</v-card-title>
          <v-card-text>
            <v-data-table
              dense
              :headers="headers"
              :items="comment.tipps"
              item-key="index"
              class="elevation-1"
            ></v-data-table>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <template v-else>Keine Kommentare vorhanden!</template>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Post",
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    post: null,
    comments: [],
    headers: [
      {
        text: "#",
        align: "start",
        sortable: false,
        value: "number",
      },
      { text: "Tipp", value: "tipp" },
      { text: "Via", value: "via" },
      { text: "Punkte", value: "points" },
    ],
  }),
  created() {
    this.loadPost();
  },
  watch: {
    $route: "loadPost",
  },
  methods: {
    loadPost() {
      this.post = this.postById(this.postId);
      this.comments = this.commentsByPostId(this.postId);
    },
    formatDate(value) {
      return new Date(value).toLocaleString();
    },
  },
  computed: {
    ...mapGetters(["postById", "commentsByPostId"]),
  },
};
</script>
