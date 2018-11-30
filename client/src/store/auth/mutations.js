export const LOGIN_OK = (state, user) => {
  state.user.userId = user.data.id
  state.user.userName = user.data.name
  state.user.userEmail = user.data.email
  state.user.userSuper = user.data.role
  state.loggedIn = true
}
