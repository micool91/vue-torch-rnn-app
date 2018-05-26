import Vuex from 'vuex'
import atob from 'atob'

var cookieparser = require('cookieparser')

const createStore = () => {
    return new Vuex.Store({
        state: {
            auth: null,
            visibleHeader: false,
            menu: {}
        },
        mutations: {
            toggle(state, key) {
                state[key] = !state[key]
            },
            update(state, data) {
                state.auth = data
            },
            setMenu(state, menu) {
                state.menu = menu
            }
        },
        actions: {
            nuxtServerInit({ commit }, { req }) {
                let accessToken = null
                if (req.headers.cookie) {
                    var parsed = cookieparser.parse(req.headers.cookie)
                    accessToken = JSON.parse(parsed.auth)
                }
                commit('update', accessToken)
            }
        },
        getters: {
            userEmail: state => {
                if (state.auth) {
                    let tokenParts = state.auth.accessToken.split(".");
                    let encodedPayload = tokenParts[1];
                    let rawPayload = atob(encodedPayload);
                    let user = JSON.parse(rawPayload);
                    return user.email
                } else {
                    return null;
                }
            },
            userToken: state => {
                return state.auth.accessToken;
            },
            isAuthenticated: state => {
                return state.auth
            }
        }
    })
}

export default createStore