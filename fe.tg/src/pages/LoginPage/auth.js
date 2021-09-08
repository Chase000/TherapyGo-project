export const isAuthenticated = () => {
    if(sessionStorage.getItem('token')) return true
    return false
}

export default {
    isAuthenticated
}