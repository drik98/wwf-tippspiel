<template>
  <v-container>
    <h3>Posts</h3>
    <v-spacer />
    <v-timeline v-if="posts.length > 0">
      <v-timeline-item v-for="post in posts" :key="post.id" fill-dot>
        <template v-slot:icon>
          <v-avatar>
            <img
              :src="`https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=${post.from.id}&height=50&width=50&ext=1622731891&hash=AeQOnPMB92ALjgcC9Ng`"
            />
          </v-avatar>
        </template>
        <template v-slot:opposite>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">{{
                formatDate(post.updated_time)
              }}</span>
            </template>
            <p :style="{ 'white-space': 'pre-line' }">{{ post.message }}</p>
          </v-tooltip>
        </template>
        <v-card>
          <v-img v-if="post.picture" height="125" :src="post.picture"></v-img>
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-text>
            <p>{{ post.detail }}</p>
            <v-btn
              class="mx-0"
              outlined
              :to="{ name: 'Post', params: { id: post.id } }"
              >Auswerten</v-btn
            >
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>

    <template v-else
      >Kein aktueller Post innerhalb der letzten 90 Tage!</template
    >
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Posts",
  watch: {
    isUserLoggedIn(isUserLoggedIn) {
      if (isUserLoggedIn) {
        this.loadFeed();
      }
    },
  },
  methods: {
    ...mapActions(["loadFeed"]),
    formatDate(value) {
      return new Date(value).toLocaleString();
    },
  },
  computed: {
    ...mapGetters(["isUserLoggedIn", "posts"]),
  },
};
</script>
