export default {
  setBrowser({ commit }, browser) {
    commit('SET_BROWSER', browser)
  },
  setFirstLoading({ commit }, is_first_loading) {
    commit('SET_FIRST_LORDING', is_first_loading)
  },
}
