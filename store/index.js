import Vuex from 'vuex'
import atob from 'atob'

var cookieparser = require('cookieparser')

const createStore = () => {
    return new Vuex.Store({
        state: {
            auth: null
        },
        mutations: {
            update(state, data) {
                state.auth = data
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
                let tokenParts = state.auth.accessToken.split(".");
                let encodedPayload = tokenParts[1];
                let rawPayload = atob(encodedPayload);
                let user = JSON.parse(rawPayload);
                return user.email
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