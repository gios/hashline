export default function requireAuth(nextState, replace) {
  let hasToken = localStorage.getItem('id_token')
  if (!hasToken) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
