<template>
  <div class="page">
    <div id="nav"><router-link to="/">Home</router-link></div>
    <div class="home">
      <h3>Posts</h3>
      <ul v-if="posts.length > 0">
        <li v-for="post in posts" :key="post.id">
          <router-link :to="`post/${post.id}`">
            {{ post.title }}({{ post.updated_time }})
          </router-link>
        </li>
      </ul>
      <template v-else
        >Kein aktueller Post innerhalb der letzten 90 Tage!</template
      >
    </div>
  </div>
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
      window.FB.api(`${process.env.FACEBOOK_GROUP_ID}/feed`, (response) => {
        if (response && !response.error) {
          this.posts = response.data.map((post) => ({
            ...post,
            title: post.message.split("\n")[0],
          }));
        }
      });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
