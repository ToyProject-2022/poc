export default {
  resetMember({ commit }) {
    commit('SET_MEMBER', {
      member_id: null,
      email: null,
      expires: 0,
    })
  },
  resetExpires({ commit }) {
    commit('SET_EXPIRES', 0)
  },
  setExpires({ commit }, data) {
    commit('SET_EXPIRES', data.expires)
  },
  setMember({ commit }, data) {
    commit('SET_MEMBER', data)
  },
}
