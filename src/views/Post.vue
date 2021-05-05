<template>
  <div class="page">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div class="post">
      <button>Auswertung starten</button>
      <h1>Post comments</h1>
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          <strong>{{ comment.from.name }}</strong>
          <ol>
            <li
              v-for="(tipp, index) in comment.tipps"
              :key="`${comment.id}_${index}`"
            >
              {{ JSON.stringify(tipp, null, 2) }}
            </li>
          </ol>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const lineBeginRegEx = /^#?[0-9]*:?/;

export default {
  name: "Post",
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    comments: [],
  }),
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.loadPostComments();
  },
  watch: {
    // call again the method if the route changes
    $route: "loadPostComments",
  },
  methods: {
    loadPostComments() {
      window.FB.api(`${this.postId}/comments`, (response) => {
        if (response && !response.error) {
          this.comments = response.data.map((comment) => ({
            ...comment,
            tipps: comment.message
              .split("\n")
              .map((line) => line.trim())
              .filter((line) => line)
              .map((line) => {
                const values = line
                  .toLowerCase()
                  .split("via")
                  .map((item) => item.trim());
                let winning = values[0];
                const formattedWinning = winning
                  .replace(lineBeginRegEx, "")
                  .trim();
                if (formattedWinning.length > 0) {
                  winning = formattedWinning;
                }
                winning = this.normalizeString(winning);
                return {
                  unformatted: line,
                  winning,
                  outcome: values[1],
                };
              }),
          }));
        }
      });
    },
    normalizeString(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
