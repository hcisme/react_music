import React from 'react'
import ReactDOM from 'react-dom'
import axiosinit from './utils/js/interceptors.js'
import './index.css'
import Router from './router/index.js'
import * as api from './utils/js/api.js'

React.Component.prototype.$api = api
React.$apis = api
React.$axios = axiosinit

ReactDOM.render(<Router />, document.getElementById('root'))
