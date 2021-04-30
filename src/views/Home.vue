<template>
  <v-container>
    <h3>Posts</h3>
    <v-spacer />
    <v-container v-if="posts.length > 0">
      <v-card v-for="post in posts" :key="post.id" elevation="2">
        <v-img height="125" :src="post.picture"></v-img>
        <v-card-title>{{ post.title }}</v-card-title>
      </v-card>
    </v-container>

    <template v-else
      >Kein aktueller Post innerhalb der letzten 90 Tage!</template
    >
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    posts: [],
  }),
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.loadFeed();
  },
  watch: {
    // call again the method if the route changes
    $route: "loadFeed",
  },
  methods: {
    loadFeed() {
      window.FB.api(
        "114069245969428/feed",
        "GET",
        { fields: "from,picture,comments,message,updated_time" },
        (response) => {
          if (response && !response.error) {
            this.posts = response.data.map((post) => ({
              ...post,
              title: post.message.split("\n")[0],
            }));
          }
        }
      );
    },
  },
};
</script>
