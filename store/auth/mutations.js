export default {
  SET_EXPIRES: (state, expires) => {
    state.member.expires = expires
  },
  SET_MEMBER: (state, data) => {
    state.member.memberId = data.memberId
    state.member.email = data.email
    state.member.expires = data.expires
  },
}
