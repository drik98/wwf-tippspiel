import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const underlineRexep = /_+/gi;
const lineBeginRegEx = /^#?[0-9]*:?/;

export default new Vuex.Store({
  state: {
    user: {
      status: "unknown",
      name: null,
    },
    posts: [],
  },
  mutations: {
    updateUserStatus({ user }, status) {
      user.status = status;
    },
    updateUserName({ user }, name) {
      user.name = name;
    },
    updatePosts(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    initialize({ commit, dispatch }) {
      window.FB.getLoginStatus(({ status }) => {
        commit("updateUserStatus", status);
        dispatch("loadUserInfo");
      });
    },
    loadUserInfo({ commit }) {
      window.FB.api("/me", ({ name }) => commit("updateUserName", name));
    },
    loadFeed({ commit }) {
      window.FB.api(
        "114069245969428/feed",
        "GET",
        { fields: "from,picture,comments,message,updated_time" },
        (response) => {
          if (response && !response.error) {
            const posts = response.data.map((post) => {
              const title = post.message.split("\n")[0];
              return {
                ...post,
                title,
                detail:
                  post.message
                    .substring(title.length)
                    .replaceAll(underlineRexep, "")
                    .substring(0, 280) + "...",
                comments: post.comments.data.map((comment) => ({
                  ...comment,
                  tipps: comment.message
                    .split("\n")
                    .map((line) => line.trim())
                    .filter((line) => line)
                    .map((line, index) => {
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
                      winning = normalizeString(winning);
                      return {
                        unformatted: line,
                        number: index + 1,
                        index: `${comment.id}-${index}`,
                        tipp: winning,
                        via: values[1],
                      };
                    }),
                })),
              };
            });
            commit("updatePosts", posts);
          }
        }
      );
    },
  },
  getters: {
    isUserLoggedIn: ({ user }) => user.status === "connected",
    userName: ({ user }) => user.name,
    posts: ({ posts }) => posts,
    postById: ({ posts }) => (id) => posts.find((post) => post.id === id),
    commentsByPostId: (_, { postById }) => (id) => postById(id).comments,
  },
});

function normalizeString(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
